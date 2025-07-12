import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Plus, Play, Share2, Users, BarChart3 } from 'lucide-react';
import { StoryProject } from '../../types/story';
import { storyStorage } from '../../utils/storage';

interface Playlist {
  id: string;
  name: string;
  description: string;
  creator: string;
  stories: string[]; // Story IDs
  isPublic: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface StoryPlaylistsProps {
  onBack: () => void;
  onPlayStory: (project: StoryProject) => void;
}

export default function Playlists({ onBack, onPlayStory }: StoryPlaylistsProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [stories, setStories] = useState<StoryProject[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: '',
    isPublic: true
  });
  const [selectedStories, setSelectedStories] = useState<string[]>([]);

  const loadStories = useCallback(async () => {
    try {
      const existingStories = await storyStorage.getAllStories();
      setStories(existingStories);
    } catch (error) {
      console.error('Failed to load stories:', error);
    }
  }, []);

  useEffect(() => {
    loadPlaylists();
    loadStories();
  }, [loadStories]);

  const loadPlaylists = () => {
    // Clear any existing playlists to ensure clean state
    localStorage.removeItem('storyPlaylists');
    
    const savedPlaylists = localStorage.getItem('storyPlaylists');
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    } else {
      // Start with empty playlists
      setPlaylists([]);
    }
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylist.name.trim() || selectedStories.length === 0) return;

    const playlist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylist.name,
      description: newPlaylist.description,
      creator: 'You',
      stories: selectedStories,
      isPublic: newPlaylist.isPublic,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedPlaylists = [playlist, ...playlists];
    setPlaylists(updatedPlaylists);
    localStorage.setItem('storyPlaylists', JSON.stringify(updatedPlaylists));
    
    setShowCreateModal(false);
    setNewPlaylist({ name: '', description: '', isPublic: true });
    setSelectedStories([]);
  };

  const handleSharePlaylist = (playlist: Playlist) => {
    const shareText = `Check out this amazing story playlist: "${playlist.name}" by ${playlist.creator}!`;
    if (navigator.share) {
      navigator.share({
        title: playlist.name,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Playlist link copied to clipboard!');
    }
  };

  const getStoriesInPlaylist = (playlist: Playlist) => {
    return stories.filter(story => playlist.stories.includes(story.story.id));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-sm p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Story Playlists
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Curated collections of stories, just like Netflix playlists
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            Create and share your own playlists
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            Discover stories from other creators
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
          </div>
        </div>

        {/* Create Playlist Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Create Playlist
          </button>
        </div>

        {/* Section Divider */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <span className="px-4 text-gray-400 text-sm font-medium">Featured Playlists</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist) => {
            const playlistStories = getStoriesInPlaylist(playlist);
            return (
              <div
                key={playlist.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-purple-500/30 transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {playlist.name}
                    </h3>
                    <p className="text-gray-300 text-sm">by {playlist.creator}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {playlist.creator === 'Aashrith Raj Tatipamula' && (
                      <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full font-semibold">
                        CREATOR
                      </span>
                    )}
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                      {playlist.isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {playlist.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    {playlistStories.length} stories
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>

                {/* Story Preview */}
                {playlistStories.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Stories in this playlist:</h4>
                    <div className="space-y-2">
                      {playlistStories.slice(0, 3).map((story) => (
                        <div key={story.story.id} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                          <div className="flex-1">
                            <p className="text-sm text-white font-medium">{story.story.title}</p>
                            <p className="text-xs text-gray-400">by {story.story.author}</p>
                          </div>
                          <button
                            onClick={() => onPlayStory(story)}
                            className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
                          >
                            <Play className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {playlistStories.length > 3 && (
                        <p className="text-xs text-gray-400 text-center">
                          +{playlistStories.length - 3} more stories
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSharePlaylist(playlist)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Playlist Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Playlist</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Playlist Name
                  </label>
                  <input
                    type="text"
                    value={newPlaylist.name}
                    onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter playlist name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newPlaylist.description}
                    onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your playlist..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newPlaylist.isPublic}
                      onChange={(e) => setNewPlaylist({ ...newPlaylist, isPublic: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Make playlist public</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Stories ({selectedStories.length} selected)
                  </label>
                  <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-300 rounded-lg p-3">
                    {stories.map((story) => (
                      <label key={story.story.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStories.includes(story.story.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStories([...selectedStories, story.story.id]);
                            } else {
                              setSelectedStories(selectedStories.filter(id => id !== story.story.id));
                            }
                          }}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{story.story.title}</p>
                          <p className="text-xs text-gray-500">by {story.story.author}</p>
                        </div>
                      </label>
                    ))}
                    {stories.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No stories available. Create some stories first!
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!newPlaylist.name.trim() || selectedStories.length === 0}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Create Playlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 