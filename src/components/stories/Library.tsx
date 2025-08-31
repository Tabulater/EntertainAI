import React, { useState, useEffect } from 'react';
import { BookOpen, Play, Plus, Edit, Trash2, Download, Upload, ArrowLeft, List } from 'lucide-react';
import { StoryProject } from '../../types/story';
import { storyStorage } from '../../utils/storage';
import { createEmptyStory } from '../../utils/storyUtils';
import Playlists from './Playlists';

interface StoryLibraryProps {
  onSelectStory: (project: StoryProject) => void;
  onPlayStory: (project: StoryProject) => void;
  onBack: () => void;
}

export default function Library({ onSelectStory, onPlayStory, onBack }: StoryLibraryProps) {
  const [stories, setStories] = useState<StoryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewStoryModal, setShowNewStoryModal] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStoryAuthor, setNewStoryAuthor] = useState('');
  const [showPlaylists, setShowPlaylists] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      console.log('Loading stories...');
      setLoading(true);
      const existingStories = await storyStorage.getAllStories();
      console.log('Loaded stories:', existingStories.length, existingStories);
      setStories(existingStories);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStory = async () => {
    if (!newStoryTitle.trim() || !newStoryAuthor.trim()) return;
    
    const story = createEmptyStory(newStoryTitle, newStoryAuthor);
    const project: StoryProject = {
      story,
      metadata: {
        version: '1.0',
        nodeCount: 1
      }
    };
    
    try {
      await storyStorage.saveStory(project);
      setStories(prev => [project, ...prev]);
      setShowNewStoryModal(false);
      setNewStoryTitle('');
      setNewStoryAuthor('');
      onSelectStory(project);
    } catch (error) {
      console.error('Failed to create story:', error);
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm('Are you sure you want to delete this story? This action cannot be undone.')) return;
    
    try {
      await storyStorage.deleteStory(storyId);
      setStories(prev => prev.filter(p => p.story.id !== storyId));
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };

  const handleExportStory = (project: StoryProject) => {
    const data = storyStorage.exportStory(project);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.story.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportStory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const project = storyStorage.importStory(e.target?.result as string);
        project.story.id = Date.now().toString(); // Generate new ID
        project.story.updatedAt = new Date().toISOString();
        
        await storyStorage.saveStory(project);
        setStories(prev => [project, ...prev]);
      } catch (error) {
        alert('Failed to import story. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handlePlayStory = (story: StoryProject) => {
    onPlayStory(story);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-white text-xl">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
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
            Adventure Story Builder
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create immersive choose-your-own-adventure stories with rich multimedia and branching narratives
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setShowNewStoryModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            New Story
          </button>
          
          <label className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Story
            <input
              type="file"
              accept=".json"
              onChange={handleImportStory}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowPlaylists(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <List className="w-5 h-5" />
            Story Playlists
          </button>
        </div>

        {/* Stories Grid */}
        {stories.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-24 h-24 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No Stories Yet</h3>
            <p className="text-gray-500 mb-6">Create your first interactive adventure story!</p>
            <button
              onClick={() => setShowNewStoryModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((project) => (
              <div
                key={project.story.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {project.story.title}
                    </h3>
                    <p className="text-gray-300 text-sm">by {project.story.author}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.story.description || 'No description available'}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                  <span>{project.metadata.nodeCount} chapters</span>
                  <span>{new Date(project.story.updatedAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePlayStory(project)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <Play className="w-4 h-4" />
                    Play
                  </button>
                  
                  <button
                    onClick={() => onSelectStory(project)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleExportStory(project)}
                    className="bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-500 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteStory(project.story.id)}
                    className="bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-500 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Story Modal */}
        {showNewStoryModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Story</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Story Title
                  </label>
                  <input
                    type="text"
                    value={newStoryTitle}
                    onChange={(e) => setNewStoryTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your story title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={newStoryAuthor}
                    onChange={(e) => setNewStoryAuthor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your name..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewStoryModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateStory}
                  disabled={!newStoryTitle.trim() || !newStoryAuthor.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Create Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Story Playlists Overlay */}
        {showPlaylists && (
          <div className="fixed inset-0 z-50">
            <Playlists
              onBack={() => setShowPlaylists(false)}
              onPlayStory={(story) => {
                setShowPlaylists(false);
                onPlayStory(story);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}