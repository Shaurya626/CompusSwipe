# Campus Swipe - Social Photo Rating Platform

A modern social platform where college students can share photos and rate each other's content through an intuitive swipe interface.

## Features

- 🎓 College-based user authentication
- 📸 Photo sharing with captions
- 👆 Tinder-like swipe interface
- 🏆 Leaderboards (college and global)
- 👨‍💼 Admin dashboard for moderation
- 📱 Responsive design for mobile and desktop
- ⚡ Real-time notifications with Socket.IO
- 🔐 Secure password reset functionality
- 📧 Email verification and notifications
- 🛡️ Rate limiting and security features
- 🎯 Production-ready with proper validation

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Socket.IO for real-time features
- Multer for file uploads
- Cloudinary for image storage

## Deployment on Vercel

### Prerequisites

1. **MongoDB Atlas Account**: Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Cloudinary Account**: Create a free account at [Cloudinary](https://cloudinary.com/)
3. **Vercel Account**: Create an account at [Vercel](https://vercel.com/)

### Step 1: Set up MongoDB Atlas

1. Create a new cluster in MongoDB Atlas
2. Create a database user with read/write permissions
3. Get your connection string (it should look like: `mongodb+srv://username:password@cluster.mongodb.net/campus-swipe`)

### Step 2: Set up Cloudinary

1. Go to your Cloudinary dashboard
2. Note down your Cloud Name, API Key, and API Secret

### Step 3: Set up Email Service (SendGrid recommended)

1. Create a SendGrid account at [SendGrid](https://sendgrid.com/)
2. Create an API key with mail send permissions
3. Verify your sender email address

### Step 4: Deploy to Vercel

1. **Fork or clone this repository**

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   In your Vercel project settings, add these environment variables:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-swipe
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   SENDGRID_API_KEY=your-sendgrid-api-key
   FROM_EMAIL=noreply@yourdomain.com
   FRONTEND_URL=https://your-app-name.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Step 5: Update CORS Settings

After deployment, update the CORS settings in your Vercel environment variables:
- Replace `your-app-name.vercel.app` with your actual Vercel domain

## Production Features

### Security Features
- Password strength validation
- Account lockout after failed login attempts
- Rate limiting on all endpoints
- Email verification required
- Secure password reset with time-limited tokens
- Input validation and sanitization

### Email Features
- Welcome emails after registration
- Email verification with beautiful templates
- Password reset emails
- Responsive HTML email templates

### Image Management
- Real Cloudinary integration for image uploads
- Automatic image optimization and resizing
- Secure image deletion
- File size and type validation

### Real-time Features
- Live notifications for likes and reactions
- Socket.IO integration for real-time updates
- College-based room management

### Admin Features
- Comprehensive user management
- Report handling system
- Account reinstatement workflow
- Detailed analytics and statistics

## Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd campus-swipe
   ```

2. **Install dependencies**:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env` in both `server` and `client` directories
   - Fill in your MongoDB URI, JWT secret, and Cloudinary credentials

4. **Start the development servers**:
   ```bash
   # Start the backend server (from server directory)
   npm run dev

   # Start the frontend server (from client directory)
   npm run dev
   ```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
campus-swipe/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── ...
│   └── ...
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── vercel.json            # Vercel configuration
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Photos
- `POST /api/photos` - Upload photo
- `GET /api/photos/feed` - Get photo feed
- `POST /api/photos/:id/swipe` - Swipe on photo

### Users
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id` - Get user profile
- `GET /api/users/leaderboard/college` - College leaderboard
- `GET /api/users/leaderboard/global` - Global leaderboard

### Admin (Admin only)
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - Manage users
- `GET /api/admin/reports` - View reports
- `PUT /api/admin/users/:id/status` - Update user status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.