import React, { useState } from 'react';
import { BookOpen, Film, User, LogOut, Sparkles, Users, BarChart3, Target, Image } from 'lucide-react';
import { User as UserType } from '../../types/auth';
import Collaboration from './Collaboration';
import Analytics from './Analytics';

interface DashboardProps {
  user: UserType;
  onSignOut: () => void;
  onNavigateToStories: () => void;
  onNavigateToMovies: () => void;
  onNavigateToMemes: () => void;
}

export function Dashboard({ user, onSignOut, onNavigateToStories, onNavigateToMovies, onNavigateToMemes }: DashboardProps) {
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">EntertainAI</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-white">
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-gray-300 text-sm">Creator</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCollaboration(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Collaboration Hub"
              >
                <Users className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowAnalytics(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Analytics"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={onSignOut}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to EntertainAI
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose your creative adventure - build interactive stories or generate AI-powered movies
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Story Builder */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-black/30 transition-all duration-300 group cursor-pointer relative h-[500px]"
               onClick={onNavigateToStories}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors">
                Interactive Story Builder
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Create immersive choose-your-own-adventure stories with rich multimedia, 
                branching narratives, and interactive elements that captivate your readers.
              </p>
              
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Visual story tree editor
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Multimedia integration
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Text-to-speech narration
                </div>
              </div>
            </div>
            
            <button className="absolute bottom-8 left-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Start Creating Stories
            </button>
          </div>

          {/* Movie Generator */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-black/30 transition-all duration-300 group cursor-pointer relative h-[500px]"
               onClick={onNavigateToMovies}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Film className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                AI Movie Generator
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transform your ideas into stunning movie concepts with AI-generated posters, 
                trailers, and scripts based on your creative prompts.
              </p>
              
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  AI-generated movie posters
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Interactive trailer creation
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Custom voice & music
                </div>
              </div>
            </div>
            
            <button className="absolute bottom-8 left-8 right-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Generate Movies
            </button>
          </div>

          {/* Meme Generator */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-black/30 transition-all duration-300 group cursor-pointer relative h-[500px]"
               onClick={onNavigateToMemes}>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                AI Meme Generator
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Create hilarious memes instantly with our free AI-powered meme generator. 
                Add custom text, choose from popular templates, and share your creations.
              </p>
              
              <div className="space-y-2 text-sm text-gray-400 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  100% Free - No Watermarks
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Popular meme templates
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Custom fonts & colors
                </div>
              </div>
            </div>
            
            <button className="absolute bottom-8 left-8 right-8 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Create Memes Free
            </button>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-16 bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Target className="w-6 h-6" />
            Your Creative Journey
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-emerald-400 mb-2">0</div>
              <p className="text-gray-300">Stories Created</p>
              <p className="text-emerald-400 text-sm">Start your first story</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
              <p className="text-gray-300">Movies Generated</p>
              <p className="text-purple-400 text-sm">Create your first movie</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-pink-400 mb-2">0</div>
              <p className="text-gray-300">Total Views</p>
              <p className="text-pink-400 text-sm">Share to get views</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">-</div>
              <p className="text-gray-300">Avg. Rating</p>
              <p className="text-blue-400 text-sm">No ratings yet</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowCollaboration(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-3"
            >
              <Users className="w-5 h-5" />
              Collaboration Hub
            </button>
            <button
              onClick={() => setShowAnalytics(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-3"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCollaboration && (
        <Collaboration
          onClose={() => setShowCollaboration(false)}
        />
      )}
      
      {showAnalytics && (
        <Analytics
          onClose={() => setShowAnalytics(false)}
          userId="current-user"
        />
      )}
    </div>
  );
}

export default Dashboard;