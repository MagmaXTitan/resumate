import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, User, LogOut, Settings, Plus, Bot } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-100">CV Builder</h1>
              </motion.div>
            </Link>

            {isAuthenticated ? (
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  to="/dashboard" 
                  className={`transition-colors ${
                    location.pathname === '/dashboard' 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/editor" 
                  className={`transition-colors ${
                    location.pathname === '/editor' 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Editor
                </Link>
                <Link 
                  to="/preview" 
                  className={`transition-colors ${
                    location.pathname === '/preview' 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Preview
                </Link>
                <Link 
                  to="/ai-assistant" 
                  className={`transition-colors flex items-center gap-2 ${
                    location.pathname === '/ai-assistant' 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  AI Assistant
                </Link>
              </nav>
            ) : (
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#templates" className="text-gray-300 hover:text-white transition-colors">
                  Templates
                </a>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing
                </a>
              </nav>
            )}

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                    <span className="hidden sm:block text-gray-300">{user?.name}</span>
                  </button>

                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1"
                    >
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign in
                  </Button>
                  <Button onClick={() => setShowAuthModal(true)}>
                    Get started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}