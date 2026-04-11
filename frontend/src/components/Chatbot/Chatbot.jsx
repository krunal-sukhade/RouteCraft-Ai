import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, Trash2, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi there! I'm your friendly travel assistant. I'm here to support and guide you! 💙\n\nI can help you with:\n• Understanding how our RouteCraft AI planner works\n• Answering questions about our features\n• Providing travel tips and suggestions\n• Directing you to the right tools\n\n**Note:** For actual trip planning, please use our RouteCraft AI Planner on the homepage! 🚀",
      timestamp: new Date(),
      suggestedQuestions: [
        "How does the AI planner work? 🤔",
        "What features do you offer? ✨",
        "Give me travel tips 💡",
        "How to plan my first trip? 🎒",
        "Is this free to use? 💰"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Don't show chatbot on dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  // Supportive responses
  const getSupportiveResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.match(/^(hi|hello|hey|greetings)/)) {
      return {
        text: "Hey there! 👋 So glad to see you! How can I support you today? I'm here to answer your questions about our travel platform and help you get started. What would you like to know? 💙",
        suggestedQuestions: [
          "How do I plan a trip? 🗺️",
          "Tell me about the features ✨",
          "Tips for first-time users 💡",
          "Is it really free? 🎉"
        ]
      };
    }
    
    if (lowerMsg.includes('how to') || lowerMsg.includes('how do i') || lowerMsg.includes('plan a trip')) {
      return {
        text: "Great question! 🎯 To plan your perfect trip:\n\n1️⃣ Go to our homepage\n2️⃣ Click on 'Plan Your Trip' button\n3️⃣ Our AI will ask about your preferences\n4️⃣ Get a personalized itinerary instantly!\n\nWould you like me to explain any specific feature in detail? 💙",
        suggestedQuestions: [
          "What information do I need? 📝",
          "How accurate are the recommendations? ⭐",
          "Can I customize my itinerary? ✏️",
          "Show me an example 📖"
        ]
      };
    }
    
    if (lowerMsg.includes('feature') || lowerMsg.includes('what can') || lowerMsg.includes('capabilities')) {
      return {
        text: "Our platform offers amazing features! 🌟\n\n✨ **Smart Itineraries** - AI creates personalized plans\n🗺️ **Hidden Gems** - Discover local secrets\n⏰ **Real-time Updates** - Live flight & weather info\n💰 **Smart Budgeting** - Optimize your spending\n🌍 **Multi-language** - 100+ languages support\n\nWant to learn more about any specific feature? I'd love to help! 💙",
        suggestedQuestions: [
          "How does smart budgeting work? 💵",
          "Tell me about hidden gems 🔍",
          "Real-time updates explained 📡",
          "Multi-language feature 🌐"
        ]
      };
    }
    
    if (lowerMsg.includes('tip') || lowerMsg.includes('advice') || lowerMsg.includes('suggest')) {
      return {
        text: "Absolutely! Here are some travel tips that our community loves: 💡\n\n🧳 **Packing**: Roll your clothes to save space\n📱 **Apps**: Download offline maps before traveling\n💰 **Money**: Notify your bank before international trips\n🎒 **Safety**: Share your itinerary with loved ones\n📅 **Timing**: Travel during shoulder season for better deals\n\nRemember, our AI planner can help you implement all these tips! Would you like to know more? 💙",
        suggestedQuestions: [
          "Packing checklist ✅",
          "Money saving tips 💰",
          "Safety advice 🛡️",
          "Best time to travel 📅"
        ]
      };
    }
    
    if (lowerMsg.includes('free') || lowerMsg.includes('cost') || lowerMsg.includes('price') || lowerMsg.includes('paid')) {
      return {
        text: "Great news! 🎉 Our basic RouteCraft AI planning is completely FREE! \n\n✅ Free features include:\n• Personalized itineraries\n• Destination recommendations\n• Budget optimization\n• Basic AI assistance\n\nWe also have premium features for power travelers, but you can plan amazing trips with the free version! 💙\n\nReady to start planning your first free trip?",
        suggestedQuestions: [
          "What's included in free? 🎁",
          "Premium features explained 💎",
          "Is there a trial period? 🆓",
          "How to upgrade? ⬆️"
        ]
      };
    }
    
    if (lowerMsg.includes('thank')) {
      return {
        text: "You're absolutely welcome! 😊 It makes me happy to help! Remember, I'm always here if you have more questions. Now, are you ready to plan an amazing adventure? The AI planner is waiting for you on the homepage! 🚀💙",
        suggestedQuestions: [
          "Take me to trip planner 🗺️",
          "More travel tips 💡",
          "Tell me about success stories ⭐",
          "How to get best deals 💰"
        ]
      };
    }
    
    return {
      text: "Thanks for reaching out! 💙 I'm here to support you on your travel journey. While I can't plan trips directly, I can:\n\n✅ Explain how our AI planner works\n✅ Answer questions about features\n✅ Provide travel tips and advice\n✅ Guide you to the right tools\n\nWhat would you like to know about our platform? Or would you like some general travel inspiration? 🌍",
      suggestedQuestions: [
        "How do I start planning? 🚀",
        "Tell me about the platform ✨",
        "Travel safety tips 🛡️",
        "Success stories 🌟",
        "Contact support 📧"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage.trim();
    
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: userMessageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const response = getSupportiveResponse(userMessageText);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.text,
        timestamp: new Date(),
        suggestedQuestions: response.suggestedQuestions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setShowSuggestions(true);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: "Chat cleared! 👋 I'm still here to help with your travel plans. What would you like to know?",
        timestamp: new Date(),
        suggestedQuestions: [
          "How does the AI planner work? 🤔",
          "What features do you offer? ✨",
          "Give me travel tips 💡",
          "How to plan my first trip? 🎒",
          "Is this free to use? 💰"
        ]
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Toggle Button - Mobile Optimized */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <div className="relative">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </motion.button>
      )}

      {/* Chatbot Window - Fully Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 'auto',
              width: 'auto'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
            style={{ 
              width: isMinimized ? '280px' : 'calc(100vw - 32px)',
              maxWidth: isMinimized ? '280px' : '450px',
              height: isMinimized ? 'auto' : '600px',
              maxHeight: '85vh'
            }}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 flex items-center justify-between flex-shrink-0`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/20 p-1.5 sm:p-2 rounded-full">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">Travel Support Assistant</h3>
                  <p className="text-white/80 text-xs">Here to help • Friendly Support</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={clearChat}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4"
                  style={{ maxHeight: 'calc(600px - 140px)', minHeight: '300px' }}
                >
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[85%] rounded-2xl p-2 sm:p-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                              : isDarkMode
                                ? 'bg-gray-800 text-gray-100'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.text}</p>
                          <p className={`text-[10px] sm:text-xs mt-1 ${
                            message.type === 'user' ? 'text-white/70' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Suggested Questions after bot message */}
                      {message.type === 'bot' && message.suggestedQuestions && showSuggestions && (
                        <div className="mt-2 sm:mt-3 ml-1 sm:ml-2">
                          <p className={`text-[10px] sm:text-xs mb-1 sm:mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            💡 You might want to ask:
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {message.suggestedQuestions.slice(0, 3).map((question, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(question)}
                                className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all ${
                                  isDarkMode
                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className={`rounded-2xl p-2 sm:p-3 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                      }`}>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={`p-3 sm:p-4 border-t flex-shrink-0 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        rows={1}
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                          isDarkMode
                            ? 'bg-gray-800 text-white border-gray-700'
                            : 'bg-gray-100 text-gray-900 border-gray-300'
                        }`}
                        style={{ minHeight: '40px', maxHeight: '80px' }}
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className={`p-2 sm:p-3 rounded-lg transition-all ${
                        inputMessage.trim()
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105'
                          : isDarkMode
                            ? 'bg-gray-800 text-gray-600'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-1 sm:mt-2">
                    <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      💙 I'm here to support you
                    </p>
                    <p className={`text-[10px] sm:text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Press ↵ to send
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;