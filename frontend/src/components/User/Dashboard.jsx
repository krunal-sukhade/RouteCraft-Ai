import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import {
  User,
  Calendar,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Plane,
  Hotel,
  Clock,
  Star,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  Bell,
  CreditCard,
  Globe,
  Compass,
  Coffee,
  Camera,
  TrendingUp,
  Award,
  Bookmark,
  Share2,
  Download,
  Filter,
  Search,
  MessageCircle,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  Menu,
  LayoutDashboard,
  History,
  Wallet,
  Users,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const navigate = useNavigate();
  // Sample user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setProfileForm(userData);
    } else {
      // Fallback user data
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        memberSince: "January 2024",
        totalTrips: 12,
        savedPlaces: 24,
        reviews: 18,
        preferences: {
          budget: "Moderate",
          interests: ["Adventure", "Culture", "Food"],
          travelStyle: "Solo",
        },
      });
      setProfileForm({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        memberSince: "January 2024",
        totalTrips: 12,
        savedPlaces: 24,
        reviews: 18,
        preferences: {
          budget: "Moderate",
          interests: ["Adventure", "Culture", "Food"],
          travelStyle: "Solo",
        },
      });
    }
  }, []);

  // Sample trips data
  const upcomingTrips = [
    {
      id: 1,
      destination: "Bali, Indonesia",
      startDate: "Dec 15, 2024",
      endDate: "Dec 22, 2024",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400",
      status: "confirmed",
      activities: ["Surfing", "Temple Tour", "Beach Relaxation"],
      budget: 1200,
      companions: 2,
    },
    {
      id: 2,
      destination: "Swiss Alps, Switzerland",
      startDate: "Jan 5, 2025",
      endDate: "Jan 12, 2025",
      image:
        "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400",
      status: "planning",
      activities: ["Skiing", "Hiking", "Scenic Train Ride"],
      budget: 2500,
      companions: 1,
    },
  ];

  const pastTrips = [
    {
      id: 3,
      destination: "Kyoto, Japan",
      startDate: "Mar 10, 2024",
      endDate: "Mar 20, 2024",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
      rating: 5,
      highlights: ["Cherry Blossoms", "Temples", "Sushi Making"],
    },
    {
      id: 4,
      destination: "Santorini, Greece",
      startDate: "Jul 5, 2024",
      endDate: "Jul 12, 2024",
      image:
        "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 4.8,
      highlights: ["Sunset Views", "Wine Tasting", "Island Hopping"],
    },
  ];

  // Sample saved locations
  const savedLocations = [
    {
      id: 1,
      name: "Café Central, Vienna",
      type: "Restaurant",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      savedDate: "2024-11-20",
    },
    {
      id: 2,
      name: "Neuschwanstein Castle",
      type: "Attraction",
      rating: 4.9,
      image:
        "https://cdn.pixabay.com/photo/2016/11/18/08/21/neuschwanstein-castle-1836323_640.jpg",
      savedDate: "2024-11-18",
    },
    {
      id: 3,
      name: "Blue Lagoon, Iceland",
      type: "Wellness",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400",
      savedDate: "2024-11-15",
    },
  ];

  // Sample AI recommendations
  const aiRecommendations = [
    {
      id: 1,
      destination: "Vietnam",
      reason: "Based on your love for Asian cuisine and adventure",
      matchScore: 95,
      image:
        "https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      id: 2,
      destination: "Peru",
      reason: "Matches your interest in hiking and ancient cultures",
      matchScore: 88,
      image:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400",
    },
  ];

  // Sample travel statistics
  const travelStats = {
    totalDistance: 45280,
    countriesVisited: 8,
    citiesVisited: 23,
    flightsTaken: 24,
    nightsBooked: 67,
    moneySaved: 1240,
  };

  // Chart data
  const monthlyActivityData = [
    { month: "Jan", trips: 1, saved: 3 },
    { month: "Feb", trips: 0, saved: 2 },
    { month: "Mar", trips: 2, saved: 5 },
    { month: "Apr", trips: 1, saved: 4 },
    { month: "May", trips: 0, saved: 2 },
    { month: "Jun", trips: 1, saved: 3 },
    { month: "Jul", trips: 2, saved: 6 },
    { month: "Aug", trips: 0, saved: 2 },
    { month: "Sep", trips: 1, saved: 4 },
    { month: "Oct", trips: 0, saved: 3 },
    { month: "Nov", trips: 1, saved: 5 },
    { month: "Dec", trips: 1, saved: 4 },
  ];

  const spendingData = [
    { name: "Flights", value: 45, color: "#3B82F6" },
    { name: "Hotels", value: 30, color: "#8B5CF6" },
    { name: "Food", value: 15, color: "#10B981" },
    { name: "Activities", value: 10, color: "#F59E0B" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleProfileUpdate = () => {
    setUser(profileForm);
    localStorage.setItem("user", JSON.stringify(profileForm));
    setEditingProfile(false);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "trips", label: "My Trips", icon: Calendar },
    { id: "saved", label: "Saved Places", icon: Bookmark },
    { id: "recommendations", label: "AI Picks", icon: Compass },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div
      className={`rounded-xl p-4 backdrop-blur-md ${isDarkMode ? "bg-gray-900/80" : "bg-white/80"}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="text-xs text-green-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <div
        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </div>
      <div
        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div
          className={`rounded-2xl p-6 mb-6 backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-600/20`}
        >
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1
                className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                Ready to plan your next adventure? Your RouteCraft AI assistant is
                here to help!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/ai-chat")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Start AI Planning
              </button>
              <button
                onClick={() => navigate("/ai-trips")}
                className={`px-6 py-2 rounded-lg border transition-all ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                View My Trips
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div
            className={`lg:w-64 ${isMobileMenuOpen ? "fixed inset-0 z-40 lg:relative" : "hidden lg:block"}`}
          >
            <div
              className={`sticky top-24 rounded-2xl p-4 backdrop-blur-md ${
                isDarkMode ? "bg-white/10" : "bg-white/80"
              } ${isMobileMenuOpen ? "h-full overflow-y-auto" : ""}`}
            >
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-300/20">
                <div className="relative inline-block">
                  <img
                    src={
                      user?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                    }
                    alt={user?.name}
                    className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-1 bg-blue-500 rounded-full">
                    <Edit2 className="w-3 h-3 text-white" />
                  </button>
                </div>
                <h3
                  className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {user?.name}
                </h3>
                <p
                  className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {user?.email}
                </p>
                <p
                  className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                >
                  Member since {user?.memberSince}
                </p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : isDarkMode
                            ? "hover:bg-white/10 text-gray-300"
                            : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                      {activeTab === tab.id && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-300/20">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 text-red-500 hover:bg-red-500/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    icon={Plane}
                    label="Total Trips"
                    value={user?.totalTrips || 12}
                    trend="+2 this year"
                    color="from-blue-500 to-cyan-500"
                  />
                  <StatCard
                    icon={Heart}
                    label="Saved Places"
                    value={user?.savedPlaces || 24}
                    trend="+5 this month"
                    color="from-pink-500 to-rose-500"
                  />
                  <StatCard
                    icon={Star}
                    label="Reviews"
                    value={user?.reviews || 18}
                    color="from-yellow-500 to-orange-500"
                  />
                  <StatCard
                    icon={Wallet}
                    label="Money Saved"
                    value={`$${travelStats.moneySaved}`}
                    trend="AI optimized"
                    color="from-green-500 to-emerald-500"
                  />
                </div>

                {/* Travel Statistics */}
                <div
                  className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Travel Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {travelStats.countriesVisited}
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Countries
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {travelStats.citiesVisited}
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Cities
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {travelStats.flightsTaken}
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Flights
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {travelStats.nightsBooked}
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Nights Booked
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {travelStats.totalDistance.toLocaleString()} km
                      </div>
                      <div
                        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        Distance Traveled
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Monthly Activity
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={monthlyActivityData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                        />
                        <XAxis
                          dataKey="month"
                          stroke={isDarkMode ? "#9CA3AF" : "#6B7280"}
                        />
                        <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                            border: "none",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="trips"
                          stroke="#3B82F6"
                          name="Trips"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="saved"
                          stroke="#8B5CF6"
                          name="Saved Places"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div
                    className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Spending Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={spendingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {spendingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                            border: "none",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div
                  className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {upcomingTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-500/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden">
                            <img
                              src={trip.image}
                              alt={trip.destination}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p
                              className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                            >
                              Upcoming: {trip.destination}
                            </p>
                            <p
                              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              {trip.startDate} - {trip.endDate}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            trip.status === "confirmed"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Trips Tab */}
            {activeTab === "trips" && (
              <div className="space-y-6">
                <div
                  className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2
                      className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      My Trips
                    </h2>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                      + Plan New Trip
                    </button>
                  </div>

                  {/* Upcoming Trips */}
                  <div className="mb-8">
                    <h3
                      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      <Calendar className="w-5 h-5" />
                      Upcoming Adventures
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {upcomingTrips.map((trip) => (
                        <div
                          key={trip.id}
                          className={`rounded-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                        >
                          <div className="h-40 overflow-hidden">
                            <img
                              src={trip.image}
                              alt={trip.destination}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4
                              className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                            >
                              {trip.destination}
                            </h4>
                            <p
                              className={`text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              📅 {trip.startDate} - {trip.endDate}
                            </p>
                            <p
                              className={`text-sm mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              💰 Budget: ${trip.budget} • 👥 {trip.companions}{" "}
                              travelers
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {trip.activities.map((activity, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-500"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button className="flex-1 text-sm px-3 py-1 rounded-lg bg-blue-500 text-white">
                                View Details
                              </button>
                              <button className="text-sm px-3 py-1 rounded-lg border border-gray-500/30">
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Past Trips */}
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      <History className="w-5 h-5" />
                      Past Journeys
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {pastTrips.map((trip) => (
                        <div
                          key={trip.id}
                          className={`rounded-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                        >
                          <div className="flex gap-4 p-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={trip.image}
                                alt={trip.destination}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4
                                className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                              >
                                {trip.destination}
                              </h4>
                              <p
                                className={`text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                              >
                                {trip.startDate} - {trip.endDate}
                              </p>
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < Math.floor(trip.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <button className="text-sm text-blue-500 hover:text-blue-600">
                                View Memories
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Places Tab */}
            {activeTab === "saved" && (
              <div
                className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Saved Places
                  </h2>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-500/10">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-500/10">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedLocations.map((place) => (
                    <div
                      key={place.id}
                      className={`rounded-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                    >
                      <div className="h-40 overflow-hidden relative">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-2 right-2 p-1 bg-red-500 rounded-full">
                          <Heart className="w-4 h-4 text-white fill-white" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4
                            className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {place.name}
                          </h4>
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-500">
                            {place.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span
                            className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {place.rating}
                          </span>
                        </div>
                        <p
                          className={`text-xs mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                        >
                          Saved on{" "}
                          {new Date(place.savedDate).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <button className="flex-1 text-sm px-3 py-1 rounded-lg bg-blue-500 text-white">
                            View Details
                          </button>
                          <button className="text-sm px-3 py-1 rounded-lg border border-gray-500/30">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendations Tab */}
            {activeTab === "recommendations" && (
              <div
                className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
                    <Compass className="w-4 h-4" />
                    <span className="text-sm">AI-Powered Recommendations</span>
                  </div>
                  <h2
                    className={`text-3xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Discover Your Next Adventure
                  </h2>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    Based on your travel history and preferences, our AI has
                    curated these destinations for you
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {aiRecommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`rounded-xl overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={rec.image}
                          alt={rec.destination}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                          {rec.matchScore}% Match
                        </div>
                      </div>
                      <div className="p-5">
                        <h3
                          className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {rec.destination}
                        </h3>
                        <p
                          className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                        >
                          {rec.reason}
                        </p>
                        <div className="flex gap-3">
                          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
                            Explore Destination
                          </button>
                          <button className="p-2 rounded-lg border border-gray-500/30">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-8 p-6 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <h3
                    className={`text-xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    🤖 RouteCraft AI Assistant Says:
                  </h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    "Based on your love for Asian cuisine and adventure
                    activities, I recommend exploring Vietnam next. I've found
                    some amazing flight deals for March 2025. Would you like me
                    to create a personalized itinerary?"
                  </p>
                  <button className="mt-4 text-blue-500 hover:text-blue-600 font-medium">
                    Generate Itinerary →
                  </button>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div
                className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Profile Information
                </h2>

                {editingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Avatar URL
                      </label>
                      <input
                        type="text"
                        value={profileForm.avatar}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            avatar: e.target.value,
                          })
                        }
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleProfileUpdate}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className={`px-6 py-2 rounded-lg border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3
                          className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {user?.name}
                        </h3>
                        <p
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          {user?.email}
                        </p>
                        <p
                          className={`text-sm mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
                        >
                          Member since {user?.memberSince}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4
                          className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          Travel Preferences
                        </h4>
                        <div className="space-y-2">
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            <span className="font-medium">Budget Level:</span>{" "}
                            {user?.preferences?.budget}
                          </p>
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            <span className="font-medium">Travel Style:</span>{" "}
                            {user?.preferences?.travelStyle}
                          </p>
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            <span className="font-medium">Interests:</span>{" "}
                            {user?.preferences?.interests?.join(", ")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4
                          className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                        >
                          Statistics
                        </h4>
                        <div className="space-y-2">
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            📍 Total Trips: {user?.totalTrips}
                          </p>
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            ❤️ Saved Places: {user?.savedPlaces}
                          </p>
                          <p
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            ⭐ Reviews Written: {user?.reviews}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingProfile(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div
                className={`rounded-2xl p-6 backdrop-blur-md ${isDarkMode ? "bg-white/10" : "bg-white/80"}`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Notification Preferences
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Email Notifications
                        </span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Push Notifications
                        </span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Travel Deals Alerts
                        </span>
                        <input type="checkbox" className="toggle" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Privacy
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Show my profile to others
                        </span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }
                        >
                          Share travel data for AI improvements
                        </span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Currency Preference
                    </h3>
                    <select
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>INR - Indian Rupee</option>
                    </select>
                  </div>

                  <div>
                    <h3
                      className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Danger Zone
                    </h3>
                    <button className="text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500/10">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
