import express from 'express';
import Photo from '../models/Photo.js';
import Swipe from '../models/Swipe.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { uploadLimiter, swipeLimiter } from '../middleware/rateLimiter.js';
import { validatePhotoUpload } from '../middleware/validation.js';
import { cloudinary } from '../config/cloudinary.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// @route   POST /api/photos
// @desc    Upload a photo
// @access  Private
router.post('/', protect, uploadLimiter, upload.single('image'), validatePhotoUpload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    const { caption } = req.body;

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'campus-swipe',
          transformation: [
            { width: 800, height: 1000, crop: 'limit', quality: 'auto' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const photo = await Photo.create({
      user: req.user.id,
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      caption: caption || ''
    });

    // Update user's total photos count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalPhotos: 1 }
    });

    // Populate user data for response
    await photo.populate('user', 'name profilePicture college');

    res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully!',
      photo
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading photo'
    });
  }
});

// @route   GET /api/photos/feed
// @desc    Get photos for swiping (college filtered)
// @access  Private
router.get('/feed', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get photos from same college that user hasn't swiped on
    const swipedPhotos = await Swipe.find({ voter: req.user.id })
      .select('photo')
      .lean();
    
    const swipedPhotoIds = swipedPhotos.map(swipe => swipe.photo);

    // Find users from same college
    const collegeUsers = await User.find({
      collegeDomain: req.user.collegeDomain,
      _id: { $ne: req.user.id },
      status: 'active'
    }).select('_id');

    const collegeUserIds = collegeUsers.map(user => user._id);

    const photos = await Photo.find({
      user: { $in: collegeUserIds },
      _id: { $nin: swipedPhotoIds },
      isActive: true
    })
    .populate('user', 'name profilePicture college')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    res.json({
      success: true,
      photos,
      pagination: {
        page,
        limit,
        hasMore: photos.length === limit
      }
    });
  } catch (error) {
    console.error('Feed error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching feed'
    });
  }
});

// @route   POST /api/photos/:id/swipe
// @desc    Swipe on a photo
// @access  Private
router.post('/:id/swipe', protect, swipeLimiter, async (req, res) => {
  try {
    const { direction, reaction } = req.body;
    const photoId = req.params.id;

    if (!['like', 'skip'].includes(direction)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid swipe direction'
      });
    }

    if (direction === 'like' && reaction && !['love', 'fire', 'smile', 'thumbsUp', 'sparkles'].includes(reaction)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reaction type'
      });
    }

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    // Prevent users from swiping on their own photos
    if (photo.user.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot swipe on your own photos'
      });
    }

    // Check if user already swiped on this photo
    const existingSwipe = await Swipe.findOne({
      voter: req.user.id,
      photo: photoId
    });

    if (existingSwipe) {
      return res.status(400).json({
        success: false,
        message: 'You have already swiped on this photo'
      });
    }

    // Create swipe record
    const swipe = await Swipe.create({
      voter: req.user.id,
      photo: photoId,
      photoOwner: photo.user,
      direction,
      reaction: direction === 'like' ? reaction : null
    });

    // Update photo stats
    if (direction === 'like') {
      photo.likes += 1;
      if (reaction && photo.reactions[reaction] !== undefined) {
        photo.reactions[reaction] += 1;
      }
    } else {
      photo.skips += 1;
    }
    
    photo.totalSwipes += 1;
    photo.calculateScore();
    await photo.save();

    // Update photo owner's stats
    if (direction === 'like') {
      const photoOwner = await User.findById(photo.user);
      photoOwner.score += 2;
      photoOwner.followers += 1;
      await photoOwner.save();
    }

    res.json({
      success: true,
      swipe,
      message: direction === 'like' ? 'Photo liked!' : 'Photo skipped'
    });
  } catch (error) {
    console.error('Swipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing swipe'
    });
  }
});

// @route   DELETE /api/photos/:id
// @desc    Delete a photo
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Photo not found'
      });
    }

    // Check if user owns the photo or is admin
    if (photo.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this photo'
      });
    }

    // Delete from Cloudinary
    if (photo.cloudinaryId && !photo.cloudinaryId.startsWith('demo_')) {
      await cloudinary.uploader.destroy(photo.cloudinaryId);
    }

    // Delete photo and related swipes
    await Swipe.deleteMany({ photo: photo._id });
    await Photo.findByIdAndDelete(photo._id);

    // Update user's total photos count
    await User.findByIdAndUpdate(photo.user, {
      $inc: { totalPhotos: -1 }
    });

    res.json({
      success: true,
      message: 'Photo deleted successfully'
    });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting photo'
    });
  }
});

// @route   GET /api/photos/user/:userId
// @desc    Get user's photos
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const photos = await Photo.find({
      user: req.params.userId,
      isActive: true
    })
    .populate('user', 'name profilePicture college')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      photos
    });
  } catch (error) {
    console.error('Get user photos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;