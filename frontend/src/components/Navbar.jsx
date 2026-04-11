import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles, User, Sun, Moon, Info, Shield, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');
  const isAdmin = isAuthenticated && userRole === 'admin';
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');
    setShowUserMenu(false);
    navigate('/');
    window.location.reload();
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      setTimeout(() => {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handlePlanTrip = () => {
    if (isAuthenticated) {
      navigate('/ai-chat');
    } else {
      navigate('/signup');
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/', active: true },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About Us', href: '/about', icon: Info },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
              <Globe className={`w-8 h-8 transition-colors ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              } group-hover:text-blue-500`} />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className={`font-bold text-xl ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Route<span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>Craft</span>
            </span>
            {isAdmin && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Admin
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`transition-colors duration-200 text-sm font-medium ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors duration-200 text-sm font-medium flex items-center gap-1 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </Link>
              )
            ))}
            
            {isAdmin && (
              <Link
                to="/admin"
                className={`transition-colors duration-200 text-sm font-medium flex items-center gap-1 ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300' 
                    : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? 'text-yellow-400 hover:bg-white/10' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`transition-colors duration-200 flex items-center gap-2 px-2 py-1 rounded-lg ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-white/10' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm hidden lg:inline">{user.name?.split(' ')[0] || 'User'}</span>
                  {isAdmin && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500 text-white">
                      Admin
                    </span>
                  )}
                </button>
                
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-50 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="py-2">
                      <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name || 'User'}
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </p>
                        {isAdmin && (
                          <p className={`text-xs mt-1 flex items-center gap-1 text-purple-500`}>
                            <Shield className="w-3 h-3" />
                            Administrator
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <User className="w-4 h-4" />
                        My Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                          isDarkMode 
                            ? 'text-red-400 hover:bg-gray-700' 
                            : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className={`transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <User className="w-5 h-5" />
              </button>
            )}
            
            <button 
              onClick={handlePlanTrip}
              className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
              } px-5 py-2 rounded-full text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105`}
            >
              {isAuthenticated ? 'Start AI Planning' : 'Plan Your Trip'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden rounded-2xl mt-2 p-4 animate-fadeIn ${
            isDarkMode 
              ? 'bg-black/90 backdrop-blur-md' 
              : 'bg-white/95 backdrop-blur-md shadow-lg'
          }`}>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`transition-colors duration-200 py-2 px-3 rounded-lg text-left ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`transition-colors duration-200 py-2 px-3 rounded-lg flex items-center gap-2 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.name}
                  </Link>
                )
              ))}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`transition-colors duration-200 py-2 px-3 rounded-lg flex items-center gap-2 ${
                    isDarkMode 
                      ? 'text-purple-400 hover:bg-white/10' 
                      : 'text-purple-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="w-5 h-5" />
                  Admin Panel
                </Link>
              )}
              
              <hr className={`${isDarkMode ? 'border-white/10' : 'border-gray-200'} my-2`} />
              
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                  isDarkMode 
                    ? 'text-yellow-400 hover:bg-white/10' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              
              {isAuthenticated ? (
                <>
                  <div className={`px-3 py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    Signed in as <span className="font-semibold">{user.name || 'User'}</span>
                    {isAdmin && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-500 text-white">
                        Admin
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:bg-white/10' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>My Dashboard</span>
                  </button>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`py-2 px-3 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                      isDarkMode 
                        ? 'text-red-400 hover:bg-white/10' 
                        : 'text-red-600 hover:bg-gray-100'
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:bg-white/10' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
              
              <button 
                onClick={handlePlanTrip}
                className={`${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
                } px-5 py-2 rounded-full text-sm font-semibold w-full mt-2 transition-all duration-300`}
              >
                {isAuthenticated ? 'Start AI Planning' : 'Plan Your Trip'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;