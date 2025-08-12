export const emailVerificationTemplate = (name, verificationUrl) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Campus Swipe</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 Campus Swipe</h1>
            <p>Welcome to the college social experience!</p>
        </div>
        <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Thanks for joining Campus Swipe! To get started, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
            
            <p>This link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't create an account with Campus Swipe, please ignore this email.</p>
            
            <p>Best regards,<br>The Campus Swipe Team</p>
        </div>
        <div class="footer">
            <p>© 2025 Campus Swipe. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const passwordResetTemplate = (name, resetUrl) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - Campus Swipe</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Password Reset</h1>
            <p>Campus Swipe Security</p>
        </div>
        <div class="content">
            <h2>Hi ${name}!</h2>
            <p>We received a request to reset your Campus Swipe password. Click the button below to create a new password:</p>
            
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
            
            <div class="warning">
                <strong>Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
            </div>
            
            <p>For security reasons, we recommend:</p>
            <ul>
                <li>Using a strong, unique password</li>
                <li>Not sharing your login credentials</li>
                <li>Logging out from shared devices</li>
            </ul>
            
            <p>Best regards,<br>The Campus Swipe Team</p>
        </div>
        <div class="footer">
            <p>© 2025 Campus Swipe. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Campus Swipe!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Campus Swipe!</h1>
            <p>Your college social journey starts here</p>
        </div>
        <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Congratulations! Your email has been verified and your Campus Swipe account is now active.</p>
            
            <h3>What you can do now:</h3>
            
            <div class="feature">
                <h4>📸 Share Your Moments</h4>
                <p>Upload photos and let your college community rate them through our fun swipe interface.</p>
            </div>
            
            <div class="feature">
                <h4>👆 Discover & Rate</h4>
                <p>Swipe through photos from students at your college and show appreciation with reactions.</p>
            </div>
            
            <div class="feature">
                <h4>🏆 Climb the Leaderboard</h4>
                <p>Earn points for likes and reactions, and compete with fellow students on college and global leaderboards.</p>
            </div>
            
            <div class="feature">
                <h4>👤 Build Your Profile</h4>
                <p>Customize your profile, add a bio, and showcase your best photos to the community.</p>
            </div>
            
            <p><strong>Ready to get started?</strong> Log in to your account and upload your first photo!</p>
            
            <p>If you have any questions or need help, don't hesitate to reach out to our support team.</p>
            
            <p>Welcome to the community!<br>The Campus Swipe Team</p>
        </div>
        <div class="footer">
            <p>© 2025 Campus Swipe. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;