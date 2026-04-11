import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  Mail,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Shield,
  Clock,
  BarChart3,
  PieChart,
  Globe,
  MessageSquare,
  Star,
  Calendar,
  DollarSign,
  Smartphone,
  Monitor,
  Flag,
  Bell,
  Archive,
  Trash2,
  Edit2,
  MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample user data
  useEffect(() => {
    // Simulate loading users
    setTimeout(() => {
      const sampleUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-01-15',
          lastActive: '2024-04-09',
          tripsPlanned: 5,
          savedPlaces: 23,
          reviews: 12,
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          role: 'user',
          status: 'active',
          joinDate: '2024-02-20',
          lastActive: '2024-04-10',
          tripsPlanned: 8,
          savedPlaces: 45,
          reviews: 23,
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop'
        },
        {
          id: 3,
          name: 'Michael Chen',
          email: 'michael@example.com',
          role: 'user',
          status: 'inactive',
          joinDate: '2024-01-10',
          lastActive: '2024-03-15',
          tripsPlanned: 2,
          savedPlaces: 8,
          reviews: 3,
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop'
        },
        {
          id: 4,
          name: 'Emily Rodriguez',
          email: 'emily@example.com',
          role: 'user',
          status: 'suspended',
          joinDate: '2024-03-01',
          lastActive: '2024-04-05',
          tripsPlanned: 3,
          savedPlaces: 15,
          reviews: 7,
          avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?w=100&h=100&fit=crop'
        },
        {
          id: 5,
          name: 'David Kim',
          email: 'david@example.com',
          role: 'admin',
          status: 'active',
          joinDate: '2023-12-01',
          lastActive: '2024-04-10',
          tripsPlanned: 15,
          savedPlaces: 67,
          reviews: 34,
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?w=100&h=100&fit=crop'
        }
      ];
      setUsers(sampleUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Statistics
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalTrips: users.reduce((sum, u) => sum + u.tripsPlanned, 0),
    totalReviews: users.reduce((sum, u) => sum + u.reviews, 0),
    newUsersThisMonth: 12,
    userGrowth: 23,
    platformUsage: 89,
    avgRating: 4.8
  };

  const handleUserAction = (userId, action) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'suspend' ? 'suspended' : action === 'activate' ? 'active' : user.status }
          : user
      )
    );
    setShowUserModal(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'content', label: 'Content Moderation', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-green-500 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +{trend}%
          </span>
        )}
      </div>
      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </h3>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {title}
      </p>
    </div>
  );

  return (
    <div className={`min-h-screen pt-20 pb-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Dashboard
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Manage users, monitor platform activity, and analyze performance
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={Users}
                trend={stats.userGrowth}
                color="from-blue-500 to-cyan-500"
              />
              <StatCard
                title="Active Users"
                value={stats.activeUsers}
                icon={Activity}
                color="from-green-500 to-emerald-500"
              />
              <StatCard
                title="Trips Planned"
                value={stats.totalTrips}
                icon={Calendar}
                trend={15}
                color="from-purple-500 to-pink-500"
              />
              <StatCard
                title="User Reviews"
                value={stats.totalReviews}
                icon={Star}
                color="from-yellow-500 to-orange-500"
              />
            </div>

            {/* Recent Activity */}
            <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h2>
              <div className="space-y-3">
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-500/10">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {user.name}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Planned {user.tripsPlanned} trips • {user.reviews} reviews
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-500'
                        : user.status === 'inactive'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  System Health
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>API Response Time</span>
                    <span className="text-green-500">124ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Server Uptime</span>
                    <span className="text-green-500">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Active Sessions</span>
                    <span className="text-blue-500">342</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Platform Usage
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>AI Planning Requests</span>
                    <span className="text-blue-500">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Saved Places</span>
                    <span className="text-purple-500">2,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>User Reviews</span>
                    <span className="text-yellow-500">567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            {/* Search and Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>

            {/* Users Table */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <tr>
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Trips</th>
                      <th className="text-left py-3 px-4">Join Date</th>
                      <th className="text-left py-3 px-4">Last Active</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-500/20 text-green-500'
                              : user.status === 'inactive'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.tripsPlanned}</td>
                        <td className="py-3 px-4">{user.joinDate}</td>
                        <td className="py-3 px-4">{user.lastActive}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className={`p-1 rounded hover:bg-gray-500/10`}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                              className={`p-1 rounded hover:bg-gray-500/10 ${
                                user.status === 'active' ? 'text-red-500' : 'text-green-500'
                              }`}
                            >
                              {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            </button>
                            <button className="p-1 rounded hover:bg-gray-500/10">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  User Growth
                </h2>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-3 text-blue-500" />
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Chart visualization would appear here
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Monthly user registration data
                    </p>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Platform Usage
                </h2>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-16 h-16 mx-auto mb-3 text-purple-500" />
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Usage statistics would appear here
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      Feature usage breakdown
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Top Destinations
              </h2>
              <div className="space-y-3">
                {['Bali, Indonesia', 'Paris, France', 'Tokyo, Japan', 'Swiss Alps', 'Santorini, Greece'].map((dest, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{dest}</span>
                    <div className="flex-1 mx-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" style={{ width: `${90 - idx * 10}%` }}></div>
                    </div>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{90 - idx * 10}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Moderation Tab */}
        {activeTab === 'content' && (
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Reviews & Comments
            </h2>
            <div className="space-y-4">
              {[
                { user: 'John Doe', content: 'Amazing platform! Helped me plan my dream trip to Bali.', rating: 5, date: '2024-04-09', status: 'approved' },
                { user: 'Sarah Johnson', content: 'The AI recommendations were spot on!', rating: 5, date: '2024-04-08', status: 'approved' },
                { user: 'Michael Chen', content: 'Great experience overall. Will use again!', rating: 4, date: '2024-04-07', status: 'pending' },
              ].map((review, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{review.user}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{review.date}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      review.status === 'approved' 
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{review.content}</p>
                  {review.status === 'pending' && (
                    <div className="flex gap-2 mt-3">
                      <button className="text-green-500 text-sm px-3 py-1 rounded border border-green-500 hover:bg-green-500/10">
                        Approve
                      </button>
                      <button className="text-red-500 text-sm px-3 py-1 rounded border border-red-500 hover:bg-red-500/10">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Generated Reports
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Monthly User Report - March 2024', date: '2024-04-01', size: '2.4 MB', type: 'PDF' },
                { name: 'Platform Analytics Q1 2024', date: '2024-03-31', size: '5.1 MB', type: 'PDF' },
                { name: 'User Feedback Summary', date: '2024-03-15', size: '1.8 MB', type: 'PDF' },
                { name: 'Destination Popularity Report', date: '2024-03-01', size: '3.2 MB', type: 'PDF' },
              ].map((report, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{report.name}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{report.date} • {report.size}</p>
                  </div>
                  <button className={`flex items-center gap-2 px-3 py-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 rounded-lg border border-dashed border-blue-500 text-blue-500 hover:bg-blue-500/10">
              Generate New Report
            </button>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className={`rounded-xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Admin Settings
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  System Configuration
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Maintenance Mode</span>
                    <input type="checkbox" className="toggle" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Auto-moderation Enabled</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Email Notifications</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </label>
                </div>
              </div>

              <div>
                <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Admin Accounts
                </h3>
                <div className="space-y-2">
                  {['admin@aitravel.com', 'moderator@aitravel.com'].map((admin, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{admin}</span>
                      <div className="flex gap-2">
                        <button className="text-blue-500">Edit</button>
                        <button className="text-red-500">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-blue-500">+ Add New Admin</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={`max-w-md w-full rounded-2xl p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                User Details
              </h3>
              <button onClick={() => setShowUserModal(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedUser.name}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedUser.email}</p>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="text-sm"><strong>Status:</strong> {selectedUser.status}</p>
                <p className="text-sm"><strong>Member Since:</strong> {selectedUser.joinDate}</p>
                <p className="text-sm"><strong>Last Active:</strong> {selectedUser.lastActive}</p>
                <p className="text-sm"><strong>Trips Planned:</strong> {selectedUser.tripsPlanned}</p>
                <p className="text-sm"><strong>Reviews Written:</strong> {selectedUser.reviews}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg">Suspend User</button>
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;