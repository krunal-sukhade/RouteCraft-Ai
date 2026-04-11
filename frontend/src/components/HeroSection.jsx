import React from 'react';
import { Sparkles, MapPin, Calendar, Users, ArrowRight, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handlePlanTrip = () => {
    if (isAuthenticated) {
      navigate('/ai-chat');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content moved here - background is now handled by BackgroundSlider */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`inline-flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6 ${
          isDarkMode ? 'bg-white/10' : 'bg-black/10'
        }`}>
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AI-Powered Travel Planning
          </span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Your Personal AI
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Travel Companion
          </span>
        </h1>
        
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Experience the future of travel planning. Our AI creates personalized itineraries,
          finds hidden gems, and optimizes your journey — all in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handlePlanTrip}
            className="btn-primary group flex items-center gap-2"
          >
            Start Planning for Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className={`btn-secondary flex items-center gap-2 ${
            isDarkMode 
              ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
              : 'bg-black/10 text-gray-900 border-gray-300 hover:bg-black/20'
          }`}>
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16">
          <div className="text-center">
            <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>10K+</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Trips Planned</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>150+</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Countries</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>98%</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          isDarkMode ? 'border-white/30' : 'border-gray-700/30'
        }`}>
          <div className={`w-1 h-2 rounded-full mt-2 animate-pulse ${
            isDarkMode ? 'bg-white' : 'bg-gray-700'
          }`}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;