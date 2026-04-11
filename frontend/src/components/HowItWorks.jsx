import React from 'react';
import { Search, Settings, MapPin, Heart, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const steps = [
  {
    icon: Search,
    title: 'Tell Us Your Dreams',
    description: 'Share your destination, budget, travel style, and preferences with our AI.',
    step: '01',
  },
  {
    icon: Settings,
    title: 'AI Works Its Magic',
    description: 'Our advanced algorithms analyze millions of data points to create your perfect plan.',
    step: '02',
  },
  {
    icon: MapPin,
    title: 'Get Your Itinerary',
    description: 'Receive a detailed day-by-day plan with activities, restaurants, and hidden gems.',
    step: '03',
  },
  {
    icon: Heart,
    title: 'Customize & Explore',
    description: 'Tweak your plan, book directly, and enjoy your stress-free journey.',
    step: '04',
  },
];

const HowItWorks = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="how-it-works" className={`py-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4 ${
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          }`}>
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Simple Process
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How It Works in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {' '}4 Easy Steps
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            From dream to destination — our AI handles the complexity so you can focus on the adventure.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className={`absolute -top-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border ${
                        isDarkMode 
                          ? 'bg-white/10 text-white border-white/20' 
                          : 'bg-black/10 text-gray-900 border-gray-300'
                      }`}>
                        {step.step}
                      </div>
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;