import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const VerifyEmail: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      
      if (response.success) {
        setStatus('success');
        setMessage('Email verified successfully!');
        
        // Store token and update user context
        localStorage.setItem('token', response.token);
        api.setAuthToken(response.token);
        updateUser(response.user);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Email verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LoadingSpinner size="md" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verifying Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500">Redirecting you to the app...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/resend-verification')}
                className="w-full py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Resend verification email
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};