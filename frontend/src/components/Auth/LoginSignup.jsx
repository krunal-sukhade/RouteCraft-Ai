import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
  Shield,
  Users
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ onClose, initialMode = 'login' }) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;
    
    return {
      isValid: isValidLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValidLength
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Determine role based on email - Only specific emails can be admin
      const isAdminEmail = formData.email === 'admin@aitravel.com' || 
                          formData.email === 'admin@example.com';
      
      const userRole = isAdminEmail ? 'admin' : 'user';
      const userName = formData.name || formData.email.split('@')[0];
      
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        name: userName,
        role: userRole,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3B82F6&color=fff`,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      }));
      
      // Store a flag to show welcome message
      sessionStorage.setItem('justLoggedIn', 'true');
      
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
        // Redirect to home page
        window.location.href = '/';
      }, 1500);
    }, 1500);
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Check if trying to signup with admin email
    if (formData.email === 'admin@aitravel.com' || formData.email === 'admin@example.com') {
      newErrors.email = 'Admin accounts cannot be created through signup. Please use login.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password must meet all requirements below';
        newErrors.passwordDetails = passwordValidation;
      }
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Regular users only for signup
      const userRole = 'user';
      const userName = formData.name;
      
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('user', JSON.stringify({ 
        email: formData.email, 
        name: userName,
        role: userRole,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3B82F6&color=fff`,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      }));
      
      // Store a flag to show welcome message
      sessionStorage.setItem('justLoggedIn', 'true');
      
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
        // Redirect to home page
        window.location.href = '/';
      }, 1500);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // For social login, default to user role (no admin via social)
      const userRole = 'user';
      const userName = `${provider} User`;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('user', JSON.stringify({ 
        email: `${provider.toLowerCase()}@example.com`, 
        name: userName,
        role: userRole,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3B82F6&color=fff`,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      }));
      
      // Store a flag to show welcome message
      sessionStorage.setItem('justLoggedIn', 'true');
      
      setTimeout(() => {
        setShowSuccess(false);
        if (onClose) onClose();
        // Redirect to home page
        window.location.href = '/';
      }, 1500);
    }, 1500);
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1 rounded-full transition-colors z-10 ${
            isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-16 left-4 right-4 bg-green-500 text-white rounded-lg p-3 flex items-center gap-2 z-20"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {mode === 'login' ? 'Login successful! Redirecting...' : 'Account created successfully! Redirecting...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {mode === 'login' 
                ? 'Sign in to continue your travel journey' 
                : 'Join us to start planning your adventures'}
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={mode === 'login' ? handleEmailLogin : handleEmailSignup} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    errors.name ? 'text-red-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>
            )}
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  errors.email ? 'text-red-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-transparent'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  errors.password ? 'text-red-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : isDarkMode
                        ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-transparent'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
              
              {/* Password requirements for signup */}
              {mode === 'signup' && formData.password && !errors.password && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-500 mb-1">Password must contain:</p>
                  {errors.passwordDetails ? (
                    <>
                      <div className={`flex items-center gap-1 text-xs ${errors.passwordDetails.hasUpperCase ? 'text-green-500' : 'text-red-500'}`}>
                        {errors.passwordDetails.hasUpperCase ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>At least one uppercase letter</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${errors.passwordDetails.hasLowerCase ? 'text-green-500' : 'text-red-500'}`}>
                        {errors.passwordDetails.hasLowerCase ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>At least one lowercase letter</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${errors.passwordDetails.hasNumbers ? 'text-green-500' : 'text-red-500'}`}>
                        {errors.passwordDetails.hasNumbers ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>At least one number</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${errors.passwordDetails.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
                        {errors.passwordDetails.hasSpecialChar ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>At least one special character</span>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${errors.passwordDetails.isValidLength ? 'text-green-500' : 'text-red-500'}`}>
                        {errors.passwordDetails.isValidLength ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>Minimum 8 characters</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="w-3 h-3" />
                        <span>At least one uppercase letter</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="w-3 h-3" />
                        <span>At least one lowercase letter</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="w-3 h-3" />
                        <span>At least one number</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="w-3 h-3" />
                        <span>At least one special character</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="w-3 h-3" />
                        <span>Minimum 8 characters</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    errors.confirmPassword ? 'text-red-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-500'
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800 text-white focus:ring-blue-500 focus:border-transparent'
                          : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
            
            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:transform hover:scale-105'
              } bg-gradient-to-r from-blue-500 to-purple-600 text-white`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>
          
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('Google')}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 border ${
                isDarkMode
                  ? 'border-gray-700 text-white hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 border ${
                isDarkMode
                  ? 'border-gray-700 text-white hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>
          
          {/* Toggle between login and signup */}
          <div className="mt-6 text-center">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className={`mt-4 p-3 rounded-lg text-center text-xs ${
            isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
          }`}>
            <p>👑 <strong>Admin Login Only:</strong> admin@aitravel.com | Any password</p>
            <p>👤 <strong>User Access:</strong> Sign up or use any email for regular user</p>
            <p className="mt-1">✨ After login, you'll be redirected to the homepage</p>
            <p>💡 Click on your profile icon to access your dashboard</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;