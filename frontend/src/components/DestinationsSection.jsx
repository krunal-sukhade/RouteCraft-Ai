import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const destinations = [
  {
    name: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    price: 'From $899',
    rating: 4.9,
    days: '7 Days',
  },
  {
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    price: 'From $1,299',
    rating: 4.8,
    days: '10 Days',
  },
  {
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
    price: 'From $1,499',
    rating: 4.9,
    days: '8 Days',
  },
  {
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2070&auto=format&fit=crop',
    price: 'From $699',
    rating: 4.7,
    days: '12 Days',
  },
];

const DestinationsSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="destinations" className={`py-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-gray-100 to-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4 ${
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          }`}>
            <MapPin className="w-4 h-4 text-red-400" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Popular Destinations
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Trending
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {' '}Destinations
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover the world's most exciting destinations curated by our AI based on current trends and traveler preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden card-hover cursor-pointer">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Favorite Button */}
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{dest.name}</h3>
                    <div className="flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-xs">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{dest.days}</span>
                    <span className="text-blue-400 font-semibold">{dest.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            isDarkMode
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              : 'bg-black/10 text-gray-900 border border-gray-300 hover:bg-black/20'
          }`}>
            Explore All Destinations
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;