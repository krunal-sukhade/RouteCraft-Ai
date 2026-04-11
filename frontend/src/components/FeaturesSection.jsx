import React from 'react';
import { Brain, Map, Clock, Sparkles, Shield, Globe2, Zap, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: Brain,
    title: 'Smart Itineraries',
    description: 'AI creates personalized day-by-day plans based on your preferences, budget, and travel style.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Map,
    title: 'Hidden Gems',
    description: 'Discover authentic local experiences and off-the-beaten-path destinations.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Live flight status, weather alerts, and local event recommendations.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Smart Budgeting',
    description: 'Optimize your spending with AI-powered cost predictions and savings tips.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Safe Travel',
    description: 'Real-time safety alerts and local emergency information.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Globe2,
    title: 'Multi-language',
    description: 'Real-time translation and local cultural guides in 100+ languages.',
    color: 'from-indigo-500 to-purple-500',
  },
];

const FeaturesSection = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleStartPlanning = () => {
    if (isAuthenticated) {
      navigate('/ai-chat');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section id="features" className={`py-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4 ${
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          }`}>
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Powerful Features
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Everything You Need for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {' '}Perfect Travel
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Our AI-powered platform combines cutting-edge technology with travel expertise
            to create unforgettable journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl p-6 card-hover cursor-pointer transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 hover:bg-white/10' 
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleStartPlanning}
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Start Planning Your Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Join thousands of happy travelers who planned their dream trips with AI
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;