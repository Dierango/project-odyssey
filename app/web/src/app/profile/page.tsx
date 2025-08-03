"use client";
import React, { useState, useEffect } from 'react';
import { User, Edit3, Shield, Key, HelpCircle, Info, LogOut, Camera, Mail, Calendar } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useRouter } from 'next/navigation';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user, updateUser, logout, isAuthenticated } = useUser();
  const router = useRouter();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState<'name' | 'email' | 'avatar' | null>(null);
  const [editValue, setEditValue] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const handleEditProfile = (field: 'name' | 'email' | 'avatar') => {
    setEditField(field);
    setEditValue(field === 'name' ? (user.name || '') : field === 'email' ? user.email : '');
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editField && editValue.trim()) {
      updateUser({
        [editField]: editValue.trim()
      });
    }
    setShowEditModal(false);
    setEditField(null);
    setEditValue('');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const MenuItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onClick, 
    danger = false 
  }: { 
    icon: any; 
    title: string; 
    subtitle?: string; 
    onClick: () => void; 
    danger?: boolean; 
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
        danger 
          ? 'bg-red-900/20 hover:bg-red-900/30 border border-red-700/30' 
          : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className={`w-5 h-5 ${danger ? 'text-red-400' : 'text-gray-400'}`} />
        <div className="text-left">
          <div className={`font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{title}</div>
          {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
        </div>
      </div>
      <div className={`text-gray-400 ${danger ? 'text-red-400' : ''}`}>›</div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* User Info Card */}
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => handleEditProfile('avatar')}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <button
                  onClick={() => handleEditProfile('name')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
                <button
                  onClick={() => handleEditProfile('email')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Member since {user.memberSince}</span>
              </div>
            </div>

            {/* Security Score */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-white">{user.securityScore}</span>
              </div>
              <div className="text-xs text-gray-400">Security Score</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Security Section */}
          <div>
            <MenuSection title="Security">
              <MenuItem
                icon={Shield}
                title="Digital Footprint Analysis"
                subtitle="Check your online presence"
                onClick={() => window.location.href = '/analysis'}
              />
              <MenuItem
                icon={Shield}
                title="Security Score"
                subtitle={`Current score: ${user.securityScore}/100`}
                onClick={() => window.location.href = '/analysis'}
              />
            </MenuSection>

            {/* Account Settings */}
            <MenuSection title="Account">
              <MenuItem
                icon={User}
                title="Edit Profile"
                subtitle="Update your information"
                onClick={() => handleEditProfile('name')}
              />
              <MenuItem
                icon={Key}
                title="Change Password"
                subtitle="Update your password"
                onClick={() => window.location.href = '/change-password'}
              />
            </MenuSection>
          </div>

          {/* Support Section */}
          <div>
            <MenuSection title="Support">
              <MenuItem
                icon={HelpCircle}
                title="Help & Support"
                subtitle="Get assistance"
                onClick={() => window.location.href = '/help'}
              />
              <MenuItem
                icon={Info}
                title="About Athena"
                subtitle="Version 1.0.0"
                onClick={() => window.location.href = '/about'}
              />
            </MenuSection>

            {/* Logout */}
            <MenuSection title="Account Actions">
              <MenuItem
                icon={LogOut}
                title="Sign Out"
                subtitle="Logout from your account"
                onClick={handleLogout}
                danger={true}
              />
            </MenuSection>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              Edit {editField === 'name' ? 'Name' : editField === 'email' ? 'Email' : 'Avatar'}
            </h3>
            
            {editField === 'avatar' ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-400">Choose an option:</div>
                <div className="space-y-2">
                  <button
                    onClick={() => alert('Camera functionality would be implemented here')}
                    className="w-full p-3 text-left bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                  >
                    Take Photo
                  </button>
                  <button
                    onClick={() => alert('Gallery functionality would be implemented here')}
                    className="w-full p-3 text-left bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                  >
                    Choose from Gallery
                  </button>
                  <button
                    onClick={() => {
                      updateUser({ avatar: null });
                      setShowEditModal(false);
                    }}
                    className="w-full p-3 text-left bg-red-700 hover:bg-red-600 rounded-lg text-white"
                  >
                    Remove Avatar
                  </button>
                </div>
              </div>
            ) : (
              <input
                type={editField === 'email' ? 'email' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`Enter new ${editField}`}
                autoFocus
              />
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              {editField !== 'avatar' && (
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
