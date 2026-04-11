import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Digital Nomad',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    text: 'This RouteCraft AI completely changed how I travel! It found me hidden gems in Tokyo that no guidebook mentioned. The itinerary was perfect.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Adventure Traveler',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    text: 'Saved me hours of research. The AI understood my preferences instantly and created a route through South America that was absolutely magical.',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    role: 'Family Traveler',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    text: 'Planning a family trip used to be stressful. Now with RouteCraft AI, we get kid-friendly recommendations and real-time updates. Game changer!',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="testimonials" className={`py-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-4 ${
            isDarkMode ? 'bg-white/5' : 'bg-black/5'
          }`}>
            <Star className="w-4 h-4 text-yellow-400" />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Traveler Stories
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Loved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {' '}Thousands of Travelers
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            See why travelers around the world trust our AI to plan their adventures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`rounded-2xl p-6 card-hover ${
              isDarkMode ? 'bg-white/5' : 'bg-white shadow-lg'
            }`}>
              <Quote className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-blue-400/30' : 'text-blue-400/30'}`} />
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;