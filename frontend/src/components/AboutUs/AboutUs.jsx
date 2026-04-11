import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { 
  Globe, 
  Users, 
  Award, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield,
  Headphones,
  Calendar,
  Star,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

const AboutUs = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = [
    { icon: Globe, value: '50K+', label: 'Happy Travelers', color: 'from-blue-500 to-cyan-500' },
    { icon: Users, value: '150+', label: 'Countries Covered', color: 'from-purple-500 to-pink-500' },
    { icon: Award, value: '98%', label: 'Satisfaction Rate', color: 'from-yellow-500 to-orange-500' },
    { icon: Heart, value: '24/7', label: 'Customer Support', color: 'from-red-500 to-rose-500' }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Travel enthusiast with 15+ years of experience',
      social: { twitter: '#', linkedin: '#', email: 'sarah@aitravel.com' }
    },
    {
      name: 'Michael Chen',
      role: 'CTO & AI Lead',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'AI expert passionate about travel tech',
      social: { twitter: '#', linkedin: '#', email: 'michael@aitravel.com' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Travel Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Former travel blogger turned planner',
      social: { twitter: '#', linkedin: '#', email: 'emily@aitravel.com' }
    },
    {
      name: 'David Kim',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Ensuring every journey is perfect',
      social: { twitter: '#', linkedin: '#', email: 'david@aitravel.com' }
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your security is our priority. We ensure safe and reliable travel experiences.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Cutting-edge AI technology to provide the best travel recommendations.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put travelers at the heart of everything we do.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'Promoting eco-friendly and responsible travel options.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen pt-20 pb-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            About RouteCraft AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            Revolutionizing travel planning with cutting-edge AI technology
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Story
              </h2>
              <div className={`w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-6`}></div>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Founded in 2020, RouteCraft AI was born from a simple idea: travel planning should be exciting, not overwhelming. 
                We've combined the power of artificial intelligence with human expertise to create personalized travel experiences 
                that perfectly match your preferences, budget, and travel style.
              </p>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Today, we're proud to have helped over 50,000 travelers explore more than 150 countries. Our AI-powered platform 
                analyzes millions of data points to find you the best flights, hotels, and hidden gems that traditional travel 
                agencies might miss.
              </p>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                But we're more than just technology. We're a team of passionate travelers who believe that every journey 
                should be unforgettable. Whether you're a solo adventurer, a family on vacation, or a business traveler, 
                we're here to make your trip perfect.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Travel team"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm">Happy Travelers</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 text-center ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              These principles guide everything we do at RouteCraft AI
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                  }`}
                >
                  <Icon className={`w-10 h-10 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {value.title}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Passionate experts dedicated to making your travel dreams come true
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                }`}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className="text-blue-500 text-sm mb-2">{member.role}</p>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {member.bio}
                  </p>
                  <div className="flex gap-3">
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact & Support Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Send us a Message
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-6"></div>
            
            {formStatus && (
              <div className={`mb-4 p-3 rounded-lg ${
                formStatus.type === 'success' 
                  ? 'bg-green-500/20 text-green-500 border border-green-500/50'
                  : 'bg-red-500/20 text-red-500 border border-red-500/50'
              }`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Get in Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-6"></div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Visit Us</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    123 Travel Street, Tech District<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Phone className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Call Us</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    +1 (555) 123-4567<br />
                    Mon-Fri, 9am-6pm PST
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <Mail className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Us</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    support@aitravel.com<br />
                    hello@aitravel.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/20">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Support Hours</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    24/7 AI Chat Support<br />
                    Human Support: 9am-9pm Daily
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  <Facebook className="w-5 h-5 text-blue-600" />
                </a>
                <a href="#" className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  <Twitter className="w-5 h-5 text-blue-400" />
                </a>
                <a href="#" className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  <Instagram className="w-5 h-5 text-pink-600" />
                </a>
                <a href="#" className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}>
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How does RouteCraft AI work?",
                a: "Our AI analyzes your preferences, budget, and travel style to create personalized itineraries, find the best flights and hotels, and discover hidden gems."
              },
              {
                q: "Is my data secure?",
                a: "Absolutely! We use industry-standard encryption and never share your personal information with third parties without your consent."
              },
              {
                q: "Can I cancel or modify my booking?",
                a: "Yes, most bookings can be modified or cancelled. Check our cancellation policy or contact support for assistance."
              },
              {
                q: "Do you offer travel insurance?",
                a: "We partner with leading insurance providers to offer comprehensive travel protection plans. Ask our AI for recommendations!"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {faq.q}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;