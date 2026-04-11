import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import BackgroundSlider from './components/BackgroundSlider';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import DestinationsSection from './components/DestinationsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './components/User/Dashboard';
import LoginSignup from './components/Auth/LoginSignup';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AboutUs from './components/AboutUs/AboutUs';
import Chatbot from './components/Chatbot/Chatbot';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminRoute from './components/Admin/AdminRoute';
import Chat from './components/AiBot/Chat';
import Trips from './components/AiBot/Trips';
import AiSuggestions from './components/AiBot/AiSuggestions';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : type === 'error' 
          ? 'bg-red-500 text-white'
          : 'bg-blue-500 text-white'
      }`}>
        {type === 'success' && <CheckCircle className="w-5 h-5" />}
        {type === 'info' && <User className="w-5 h-5" />}
        <span className="flex-1 text-sm">{message}</span>
        <button onClick={onClose} className="hover:opacity-80">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Component to handle conditional navbar and background
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const { isDarkMode } = useTheme();
  
  // Check if current page is auth page (to hide background slider)
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboard = location.pathname === '/dashboard';
  const isAboutPage = location.pathname === '/about';
  const isAdminPage = location.pathname === '/admin';
  const isAiChatPage = location.pathname === '/ai-chat';
  const isAiTripsPage = location.pathname === '/ai-trips';
  const isAiSuggestionsPage = location.pathname === '/ai-suggestions';
  const shouldShowBackground = !isAuthPage && !isDashboard && !isAboutPage && !isAdminPage && !isAiChatPage && !isAiTripsPage && !isAiSuggestionsPage;

  // Check for welcome message on mount
  useEffect(() => {
    // Check if user just logged in
    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = localStorage.getItem('userRole');
    
    if (justLoggedIn === 'true') {
      const roleText = userRole === 'admin' ? 'Admin' : '';
      const welcomeMessage = `Welcome${roleText ? ' ' + roleText : ''}${user.name ? ', ' + user.name : ''}! 👋 Ready to plan your next adventure?`;
      
      setToastMessage(welcomeMessage);
      setToastType('success');
      setShowToast(true);
      
      // Clear the flag
      sessionStorage.removeItem('justLoggedIn');
    }
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to section when navigating from dashboard
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Clear the state
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">AI Travel Planner</p>
          <p className="text-gray-400 mt-2">Crafting your perfect journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <Navbar />
      
      {/* Welcome Toast Notification */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      {shouldShowBackground ? (
        <BackgroundSlider>
          <Routes>
            <Route path="/" element={
              <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <DestinationsSection />
                <TestimonialsSection />
              </main>
            } />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
          <Footer />
          <Chatbot />
        </BackgroundSlider>
      ) : (
        <>
          <Routes>
            {/* Home page - shows hero section */}
            <Route path="/" element={
              <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <DestinationsSection />
                <TestimonialsSection />
              </main>
            } />
            
            {/* User Dashboard - only for regular users */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Dashboard - only for admin users */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* AI Bot Features - accessible to both users and admins */}
            <Route path="/ai-chat" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Chat />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-trips" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Trips />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-suggestions" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <AiSuggestions />
              </ProtectedRoute>
            } />
            
            {/* About Us - accessible to everyone */}
            <Route path="/about" element={<AboutUs />} />
            
            {/* Auth pages */}
            <Route path="/login" element={<LoginSignup onClose={() => navigate('/')} initialMode="login" />} />
            <Route path="/signup" element={<LoginSignup onClose={() => navigate('/')} initialMode="signup" />} />
          </Routes>
          
          {/* Show chatbot on all pages except auth pages and AI bot pages */}
          {!isAuthPage && !isAdminPage && !isAiChatPage && !isAiTripsPage && !isAiSuggestionsPage && <Chatbot />}
        </>
      )}
    </div>
  );
};

// Wrapper component that applies dark mode class to root
const ThemedApp = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <AppContent />
    </div>
  );
};

function App() {
  const videoSource = null;

  return (
    <ThemeProvider>
      <Router>
        <ThemedApp />
      </Router>
    </ThemeProvider>
  );
}

export default App;