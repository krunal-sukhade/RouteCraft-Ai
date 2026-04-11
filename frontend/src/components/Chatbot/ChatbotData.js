// Comprehensive travel database for the chatbot

export const travelData = {
  destinations: {
    paris: {
      name: "Paris",
      country: "France",
      attractions: ["Eiffel Tower 🗼", "Louvre Museum 🎨", "Notre-Dame Cathedral ⛪", "Montmartre 🎭", "Seine River Cruise 🚤"],
      bestTime: "April to June and September to October",
      budget: "$$$ (Expensive)",
      currency: "Euro (€)",
      language: "French",
      food: ["Croissants 🥐", "Escargots 🐌", "Macarons 🍪", "French Onion Soup 🧅"],
      tips: [
        "Learn basic French phrases like 'Bonjour' and 'Merci'",
        "Buy a Paris Museum Pass for discounts",
        "Use the Metro - it's efficient and affordable",
        "Visit popular attractions early morning to avoid crowds"
      ],
      averageFlightCost: "$800-1200",
      averageHotelCost: "$150-300 per night"
    },
    tokyo: {
      name: "Tokyo",
      country: "Japan",
      attractions: ["Shibuya Crossing 🚦", "Senso-ji Temple 🏯", "Tokyo Tower 🗼", "Akihabara Electric Town 🎮", "Meiji Shrine ⛩️"],
      bestTime: "March-April (Cherry Blossoms) or October-November",
      budget: "$$$ (Expensive)",
      currency: "Japanese Yen (¥)",
      language: "Japanese",
      food: ["Sushi 🍣", "Ramen 🍜", "Tempura 🍤", "Matcha desserts 🍵"],
      tips: [
        "Get a Japan Rail Pass for unlimited travel",
        "Learn basic Japanese etiquette",
        "Carry cash - many places don't accept cards",
        "Try convenience store food - it's surprisingly good!"
      ],
      averageFlightCost: "$1000-1500",
      averageHotelCost: "$120-250 per night"
    },
    bali: {
      name: "Bali",
      country: "Indonesia",
      attractions: ["Ubud Monkey Forest 🐒", "Tanah Lot Temple 🛕", "Rice Terraces 🌾", "Kuta Beach 🏖️", "Mount Batur 🌋"],
      bestTime: "April to October",
      budget: "$$ (Moderate)",
      currency: "Indonesian Rupiah (Rp)",
      language: "Indonesian, Balinese",
      food: ["Nasi Goreng 🍚", "Babi Guling 🐷", "Satay 🍢", "Fresh Coconut 🥥"],
      tips: [
        "Rent a scooter for easy exploration",
        "Respect local customs and dress modestly at temples",
        "Try local warungs for authentic cheap food",
        "Book tours through reputable companies"
      ],
      averageFlightCost: "$500-900",
      averageHotelCost: "$30-100 per night"
    },
    rome: {
      name: "Rome",
      country: "Italy",
      attractions: ["Colosseum 🏟️", "Vatican City ⛪", "Trevi Fountain 💧", "Pantheon 🏛️", "Spanish Steps 📍"],
      bestTime: "April to June and September to October",
      budget: "$$$ (Expensive)",
      currency: "Euro (€)",
      language: "Italian",
      food: ["Pizza 🍕", "Pasta 🍝", "Gelato 🍦", "Tiramisu 🍰"],
      tips: [
        "Book Colosseum tickets in advance",
        "Throw a coin in Trevi Fountain for good luck",
        "Use public transport - it's reliable",
        "Avoid restaurants near tourist attractions"
      ],
      averageFlightCost: "$700-1100",
      averageHotelCost: "$120-250 per night"
    },
    thailand: {
      name: "Thailand",
      country: "Thailand",
      attractions: ["Grand Palace 🏰", "Phi Phi Islands 🏝️", "Chiang Mai temples 🛕", "Floating Markets 🛶", "Railay Beach 🧗"],
      bestTime: "November to February",
      budget: "$ (Budget Friendly)",
      currency: "Thai Baht (฿)",
      language: "Thai",
      food: ["Pad Thai 🍜", "Tom Yum Goong 🍲", "Mango Sticky Rice 🥭", "Green Curry 🍛"],
      tips: [
        "Learn to say 'Sawasdee' (Hello)",
        "Use Grab app for taxis",
        "Try street food - it's safe and delicious",
        "Get travel insurance for motorbike rentals"
      ],
      averageFlightCost: "$600-1000",
      averageHotelCost: "$20-60 per night"
    }
  },
  
  flights: {
    searchTips: [
      "Book 6-8 weeks in advance for best deals",
      "Use incognito mode when searching flights",
      "Consider nearby airports for cheaper options",
      "Tuesday and Wednesday are cheapest days to fly",
      "Set price alerts on flight comparison websites"
    ],
    budgetAirlines: {
      "Asia": "AirAsia, Scoot, Jetstar",
      "Europe": "Ryanair, EasyJet, Wizz Air",
      "USA": "Southwest, Spirit, Frontier",
      "Australia": "Jetstar, Tigerair"
    }
  },
  
  hotels: {
    bookingTips: [
      "Compare prices across multiple platforms",
      "Book refundable rates when possible",
      "Check hotel location on Google Maps",
      "Read recent reviews (last 3 months)",
      "Join hotel loyalty programs for perks"
    ],
    platforms: ["Booking.com", "Agoda", "Expedia", "Hotels.com", "Airbnb"]
  },
  
  generalTips: {
    packing: [
      "Pack light - you'll thank yourself later",
      "Roll clothes to save space",
      "Bring a portable charger",
      "Pack a universal adapter",
      "Carry a reusable water bottle"
    ],
    safety: [
      "Share your itinerary with family/friends",
      "Keep copies of important documents",
      "Get travel insurance",
      "Learn local emergency numbers",
      "Trust your instincts"
    ],
    money: [
      "Notify your bank about travel plans",
      "Carry multiple payment methods",
      "Use ATMs during banking hours",
      "Keep emergency cash separate",
      "Learn currency exchange rates"
    ]
  }
};

// Enhanced bot response function
export const getBotResponse = (userInput) => {
  const input = userInput.toLowerCase().trim();
  
  // Check for specific destination queries
  for (const [key, destination] of Object.entries(travelData.destinations)) {
    if (input.includes(key) || input.includes(destination.name.toLowerCase())) {
      return {
        text: `✨ **${destination.name}, ${destination.country}** ✨\n\n` +
               `📍 **Top Attractions:**\n${destination.attractions.join('\n')}\n\n` +
               `📅 **Best Time to Visit:** ${destination.bestTime}\n\n` +
               `💰 **Budget Level:** ${destination.budget}\n\n` +
               `🍜 **Must-Try Foods:**\n${destination.food.join(', ')}\n\n` +
               `💡 **Travel Tips:**\n${destination.tips.map(tip => `• ${tip}`).join('\n')}\n\n` +
               `✈️ **Average Flight Cost:** ${destination.averageFlightCost}\n` +
               `🏨 **Average Hotel Cost:** ${destination.averageHotelCost}\n\n` +
               `Want me to help you plan a trip to ${destination.name}? 🎒`,
        suggestedQuestions: [
          `Find flights to ${destination.name} ✈️`,
          `Hotels in ${destination.name} 🏨`,
          `Weather in ${destination.name} 🌤️`,
          `${destination.name} itinerary for 7 days 📅`,
          `Best restaurants in ${destination.name} 🍽️`
        ]
      };
    }
  }
  
  // Check for flight-related queries
  if (input.includes('flight') || input.includes('fly') || input.includes('airplane')) {
    return {
      text: "✈️ **Flight Tips & Information** ✈️\n\n" +
            "**Best Time to Book:**\n• Book 6-8 weeks in advance\n• Tuesday/Wednesday cheapest days\n\n" +
            "**Budget Airlines by Region:**\n" +
            "• Asia: AirAsia, Scoot, Jetstar\n" +
            "• Europe: Ryanair, EasyJet, Wizz Air\n" +
            "• USA: Southwest, Spirit, Frontier\n\n" +
            "**Money-Saving Tips:**\n" +
            "• Use incognito mode when searching\n" +
            "• Consider nearby airports\n" +
            "• Set price alerts\n\n" +
            "Which destination are you interested in? I can help find specific flight deals! 🎯",
      suggestedQuestions: [
        "Cheapest destinations to fly to 💰",
        "Best time to book flights 📅",
        "How to find flight deals 🔍",
        "What's a good flight price? 💵",
        "Direct vs connecting flights 🔄"
      ]
    };
  }
  
  // Check for hotel queries
  if (input.includes('hotel') || input.includes('stay') || input.includes('accommodation') || input.includes('place to stay')) {
    return {
      text: "🏨 **Hotel Booking Guide** 🏨\n\n" +
            "**Booking Tips:**\n" +
            "• Compare prices across multiple platforms\n" +
            "• Book refundable rates when possible\n" +
            "• Check hotel location on Google Maps\n" +
            "• Read recent reviews (last 3 months)\n\n" +
            "**Best Booking Platforms:**\n" +
            "• Booking.com - Wide selection\n" +
            "• Agoda - Best for Asia\n" +
            "• Expedia - Package deals\n" +
            "• Airbnb - Unique stays\n\n" +
            "**Pro Tip:** Join hotel loyalty programs for free upgrades! 🌟\n\n" +
            "Tell me your destination and budget for personalized recommendations!",
      suggestedQuestions: [
        "Best hotels in Paris 🗼",
        "Budget hostels in Thailand 🎒",
        "Luxury resorts in Bali 🌴",
        "How to get hotel discounts 💰",
        "Hotel safety tips 🔒"
      ]
    };
  }
  
  // Check for budget queries
  if (input.includes('budget') || input.includes('cheap') || input.includes('cost') || input.includes('expensive')) {
    return {
      text: "💰 **Budget Travel Guide** 💰\n\n" +
            "**Budget-Friendly Destinations:**\n" +
            "• Southeast Asia ($30-50/day)\n" +
            "• Eastern Europe ($50-70/day)\n" +
            "• Central America ($40-60/day)\n" +
            "• India ($20-40/day)\n\n" +
            "**Money-Saving Tips:**\n" +
            "• Travel during off-season\n" +
            "• Use public transportation\n" +
            "• Eat like a local\n" +
            "• Stay in hostels or guesthouses\n" +
            "• Book flights on Tuesdays\n\n" +
            "**Average Daily Budget by Region:**\n" +
            "• Southeast Asia: $30-50\n" +
            "• South America: $40-70\n" +
            "• Europe: $80-150\n" +
            "• North America: $100-200\n\n" +
            "What's your daily budget? I can suggest destinations that match! 💵",
      suggestedQuestions: [
        "Cheapest countries to visit 🌏",
        "How to save money on flights ✈️",
        "Free things to do in cities 🆓",
        "Budget travel hacks 💡",
        "Solo travel on a budget 👤"
      ]
    };
  }
  
  // Check for travel tips
  if (input.includes('tip') || input.includes('advice') || input.includes('guide') || input.includes('how to')) {
    return {
      text: "💡 **Essential Travel Tips** 💡\n\n" +
            "**Packing Tips:**\n" +
            travelData.generalTips.packing.map(tip => `• ${tip}`).join('\n') + "\n\n" +
            "**Safety Tips:**\n" +
            travelData.generalTips.safety.map(tip => `• ${tip}`).join('\n') + "\n\n" +
            "**Money Tips:**\n" +
            travelData.generalTips.money.map(tip => `• ${tip}`).join('\n') + "\n\n" +
            "Want more specific tips for your destination? Just ask! 🎒",
      suggestedQuestions: [
        "Packing checklist for 1 week ✅",
        "How to stay safe abroad 🛡️",
        "Travel insurance explained 📄",
        "First time solo travel tips 👤",
        "How to avoid tourist traps 🚫"
      ]
    };
  }
  
  // Check for weather queries
  if (input.includes('weather') || input.includes('climate') || input.includes('season') || input.includes('best time')) {
    return {
      text: "🌤️ **Weather & Best Time to Visit** 🌤️\n\n" +
            "**By Season:**\n" +
            "• Spring (Mar-May): Mild weather, flowers blooming 🌸\n" +
            "• Summer (Jun-Aug): Hot, peak tourist season ☀️\n" +
            "• Fall (Sep-Nov): Pleasant, fewer crowds 🍂\n" +
            "• Winter (Dec-Feb): Cold, good for skiing ❄️\n\n" +
            "**Popular Destinations by Season:**\n" +
            "• Winter: Thailand, Bali, Caribbean\n" +
            "• Summer: Europe, Japan, Canada\n" +
            "• Spring/Fall: Most destinations ideal\n\n" +
            "Which destination are you interested in? I can give you specific weather information! 📍",
      suggestedQuestions: [
        "Best time to visit Japan 🇯🇵",
        "Weather in Europe in summer ☀️",
        "When is rainy season in Bali ☔",
        "Ski season in Switzerland ⛷️",
        "Hurricane season in Caribbean 🌀"
      ]
    };
  }
  
  // Check for greetings
  if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('greetings')) {
    return {
      text: "Hello there! 👋 I'm your RouteCraft AI assistant. I can help you with:\n\n" +
            "• Finding the best destinations 🌍\n" +
            "• Flight and hotel deals ✈️🏨\n" +
            "• Travel tips and advice 💡\n" +
            "• Budget planning 💰\n" +
            "• Local cuisine recommendations 🍜\n" +
            "• Weather information 🌤️\n\n" +
            "What would you like to know about your next adventure?",
      suggestedQuestions: [
        "Recommend a destination for me 🗺️",
        "Find cheap flights ✈️",
        "Travel tips for beginners 💡",
        "Best solo travel destinations 👤",
        "Family vacation ideas 👨‍👩‍👧‍👦"
      ]
    };
  }
  
  // Check for thank you
  if (input.includes('thank')) {
    return {
      text: "You're very welcome! 😊 I'm glad I could help. Is there anything else about travel planning I can assist you with? Remember, I'm here 24/7 to help you plan your perfect journey! ✨",
      suggestedQuestions: [
        "Plan a 7-day itinerary 📅",
        "Find travel deals 💰",
        "Packing tips 🎒",
        "Visa requirements 📋",
        "Travel insurance info 📄"
      ]
    };
  }
  
  // Default response for other queries
  return {
    text: "Thanks for your message! 🌍 I'm here to help with all your travel needs. Could you tell me more about what you're looking for?\n\n" +
          "**I can help with:**\n" +
          "• ✈️ Finding flights and deals\n" +
          "• 🏨 Hotel and accommodation recommendations\n" +
          "• 🗺️ Destination guides and attractions\n" +
          "• 💰 Budget planning and cost estimates\n" +
          "• 🍜 Local food and restaurant tips\n" +
          "• 🌤️ Weather and best time to visit\n" +
          "• 💡 Travel tips and advice\n\n" +
          "What specific information are you looking for?",
    suggestedQuestions: [
      "Tell me about Paris 🇫🇷",
      "Find cheap flights to Asia ✈️",
      "Budget travel tips 💰",
      "Best beaches in the world 🏖️",
      "Solo female travel safety 👩"
    ]
  };
};