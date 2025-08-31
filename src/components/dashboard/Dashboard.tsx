import React, { useState, useEffect } from 'react';
import { BookOpen, Film, User, LogOut, Sparkles, Users, BarChart3, Target, Image, TrendingUp, Clock, Star } from 'lucide-react';
import { User as UserType } from '../../types/auth';
import { StoryProject } from '../../types/story';
import { storyStorage } from '../../utils/storage';
import { getStoryStats } from '../../utils/storyUtils';
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
  const [stories, setStories] = useState<StoryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [journeyStats, setJourneyStats] = useState({
    totalStories: 0,
    totalChapters: 0,
    totalChoices: 0,
    totalEndings: 0,
    averageRating: 0,
    totalViews: 0,
    recentActivity: [] as any[]
  });

  useEffect(() => {
    loadJourneyStats();
  }, []);

  const loadJourneyStats = async () => {
    try {
      setLoading(true);
      const userStories = await storyStorage.getAllStories();
      setStories(userStories);

      // Calculate comprehensive stats
      const stats = {
        totalStories: userStories.length,
        totalChapters: 0,
        totalChoices: 0,
        totalEndings: 0,
        averageRating: 0,
        totalViews: 0,
        recentActivity: [] as any[]
      };

      // Calculate story-specific stats
      userStories.forEach(story => {
        const storyStats = getStoryStats(story.story);
        stats.totalChapters += storyStats.nodeCount;
        stats.totalChoices += storyStats.choiceCount;
        stats.totalEndings += storyStats.endingCount;
        
        // Add to recent activity
        stats.recentActivity.push({
          type: 'story',
          title: story.story.title,
          date: story.story.updatedAt,
          action: 'Updated'
        });
      });

      // Sort recent activity by date
      stats.recentActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      stats.recentActivity = stats.recentActivity.slice(0, 5); // Show last 5 activities

      setJourneyStats(stats);
    } catch (error) {
      console.error('Failed to load journey stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh stats when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      loadJourneyStats();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

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
                onClick={loadJourneyStats}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Refresh Stats"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
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
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-300">Loading your creative journey...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">{journeyStats.totalStories}</div>
                  <p className="text-gray-300">Stories Created</p>
                  <p className="text-emerald-400 text-sm">
                    {journeyStats.totalStories === 0 ? 'Start your first story' : `${journeyStats.totalChapters} total chapters`}
                  </p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{journeyStats.totalChoices}</div>
                  <p className="text-gray-300">Choices Created</p>
                  <p className="text-purple-400 text-sm">
                    {journeyStats.totalChoices === 0 ? 'Add choices to your stories' : 'Branching narratives'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-pink-400 mb-2">{journeyStats.totalEndings}</div>
                  <p className="text-gray-300">Story Endings</p>
                  <p className="text-pink-400 text-sm">
                    {journeyStats.totalEndings === 0 ? 'Create story endings' : 'Multiple outcomes'}
                  </p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {journeyStats.averageRating > 0 ? journeyStats.averageRating.toFixed(1) : '-'}
                  </div>
                  <p className="text-gray-300">Avg. Rating</p>
                  <p className="text-blue-400 text-sm">
                    {journeyStats.averageRating > 0 ? 'Community feedback' : 'No ratings yet'}
                  </p>
                </div>
              </div>

              {/* Recent Activity */}
              {journeyStats.recentActivity.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </h4>
                  <div className="space-y-3">
                    {journeyStats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.title}</p>
                          <p className="text-gray-400 text-sm">
                            {activity.action} • {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Indicators */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-semibold">Story Progress</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">{journeyStats.totalStories}</div>
                  <p className="text-gray-300 text-sm">Stories in progress</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Content Creation</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{journeyStats.totalChapters}</div>
                  <p className="text-gray-300 text-sm">Chapters written</p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">Creative Milestones</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{journeyStats.totalEndings}</div>
                  <p className="text-gray-300 text-sm">Completed endings</p>
                </div>
              </div>

              {/* Recent Stories */}
              {stories.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Your Stories
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stories.slice(0, 6).map((story) => {
                      const storyStats = getStoryStats(story.story);
                      return (
                        <div key={story.story.id} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                             onClick={() => onNavigateToStories()}>
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="text-white font-semibold truncate flex-1">{story.story.title}</h5>
                            <span className="text-xs text-gray-400 ml-2">
                              {new Date(story.story.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {story.story.description || 'No description'}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{storyStats.nodeCount} chapters</span>
                            <span>{storyStats.choiceCount} choices</span>
                            <span>{storyStats.endingCount} endings</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {stories.length > 6 && (
                    <div className="text-center mt-4">
                      <button
                        onClick={onNavigateToStories}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        View all {stories.length} stories →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
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