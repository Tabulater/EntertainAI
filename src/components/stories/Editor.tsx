import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Settings, Plus, Trash2, Image, Music, Volume2 } from 'lucide-react';
import { StoryProject, StoryNode } from '../../types/story';
import { storyStorage } from '../../utils/storage';
import { createEmptyNode, createChoice, getStoryStats } from '../../utils/storyUtils';
import { audioManager } from '../../utils/audio';

interface StoryEditorProps {
  project: StoryProject;
  onBack: () => void;
  onPreview: (project: StoryProject) => void;
}

export default Editor;

function Editor({ project, onBack, onPreview }: StoryEditorProps) {
  const [currentProject, setCurrentProject] = useState(project);
  const [selectedNodeId, setSelectedNodeId] = useState(project.story.startNodeId);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const selectedNode = currentProject.story.nodes[selectedNodeId];
  const stats = getStoryStats(currentProject.story);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  const updateProject = (updater: (project: StoryProject) => StoryProject) => {
    setCurrentProject(updater);
    setUnsavedChanges(true);
  };

  const updateNode = (nodeId: string, updater: (node: StoryNode) => StoryNode) => {
    updateProject(project => ({
      ...project,
      story: {
        ...project.story,
        nodes: {
          ...project.story.nodes,
          [nodeId]: updater(project.story.nodes[nodeId])
        }
      }
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Starting save process...');
      const updatedProject = {
        ...currentProject,
        story: {
          ...currentProject.story,
          updatedAt: new Date().toISOString()
        },
        metadata: {
          ...currentProject.metadata,
          nodeCount: Object.keys(currentProject.story.nodes).length
        }
      };
      
      console.log('Saving project:', updatedProject.story.id, updatedProject.story.title);
      await storyStorage.saveStory(updatedProject);
      console.log('Save completed successfully');
      setCurrentProject(updatedProject);
      setUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save story:', error);
      alert('Failed to save story. Please try again.');
    }
  };

  const addNewNode = () => {
    const newNode = createEmptyNode();
    updateProject(project => ({
      ...project,
      story: {
        ...project.story,
        nodes: {
          ...project.story.nodes,
          [newNode.id]: newNode
        }
      }
    }));
    setSelectedNodeId(newNode.id);
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === currentProject.story.startNodeId) {
      alert('Cannot delete the starting chapter');
      return;
    }

    if (!confirm('Are you sure you want to delete this chapter?')) return;

    updateProject(project => {
      const newNodes = { ...project.story.nodes };
      delete newNodes[nodeId];
      
      // Remove choices pointing to this node
      Object.values(newNodes).forEach(node => {
        node.choices = node.choices.filter(choice => choice.targetNodeId !== nodeId);
      });

      return {
        ...project,
        story: {
          ...project.story,
          nodes: newNodes
        }
      };
    });

    if (selectedNodeId === nodeId) {
      setSelectedNodeId(currentProject.story.startNodeId);
    }
  };

  const addChoice = () => {
    const choice = createChoice('New choice', '');
    updateNode(selectedNodeId, node => ({
      ...node,
      choices: [...node.choices, choice]
    }));
  };

  const updateChoice = (choiceId: string, field: 'text' | 'targetNodeId', value: string) => {
    updateNode(selectedNodeId, node => ({
      ...node,
      choices: node.choices.map(choice =>
        choice.id === choiceId ? { ...choice, [field]: value } : choice
      )
    }));
  };

  const deleteChoice = (choiceId: string) => {
    updateNode(selectedNodeId, node => ({
      ...node,
      choices: node.choices.filter(choice => choice.id !== choiceId)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateNode(selectedNodeId, node => ({
          ...node,
          image: result,
          imageType: 'upload'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateNode(selectedNodeId, node => ({
          ...node,
          backgroundMusic: result,
          musicType: 'upload'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const testTTS = () => {
    if (selectedNode.content.trim()) {
      audioManager.speakText(selectedNode.content);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">{currentProject.story.title}</h1>
              <p className="text-gray-300 text-sm">
                {stats.nodeCount} chapters • {stats.choiceCount} choices • {stats.endingCount} endings
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => onPreview(currentProject)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={!unsavedChanges}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {unsavedChanges ? 'Save*' : 'Saved'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Chapter List */}
        <div className="w-80 bg-black/20 backdrop-blur-sm border-r border-white/10 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Chapters</h2>
            <button
              onClick={addNewNode}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {Object.entries(currentProject.story.nodes).map(([nodeId, node]) => (
              <div
                key={nodeId}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  nodeId === selectedNodeId
                    ? 'bg-purple-600/50 border border-purple-400'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
                onClick={() => setSelectedNodeId(nodeId)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {node.title}
                      {nodeId === currentProject.story.startNodeId && (
                        <span className="ml-2 text-xs bg-emerald-600 text-white px-1.5 py-0.5 rounded">START</span>
                      )}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mt-1">
                      {node.content || 'No content yet...'}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span>{node.choices.length} choices</span>
                      {node.image && <Image className="w-3 h-3" />}
                      {node.backgroundMusic && <Music className="w-3 h-3" />}
                      {node.enableTTS && <Volume2 className="w-3 h-3" />}
                    </div>
                  </div>
                  {nodeId !== currentProject.story.startNodeId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNode(nodeId);
                      }}
                      className="p-1 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedNode && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Chapter Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chapter Title
                </label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => updateNode(selectedNodeId, node => ({ ...node, title: e.target.value }))}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter chapter title..."
                />
              </div>

              {/* Chapter Content */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Chapter Content
                </label>
                <textarea
                  value={selectedNode.content}
                  onChange={(e) => updateNode(selectedNodeId, node => ({ ...node, content: e.target.value }))}
                  className="w-full h-40 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Write your chapter content here..."
                />
              </div>

              {/* Media Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chapter Image
                  </label>
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={selectedNode.imageType === 'url' ? selectedNode.image || '' : ''}
                      onChange={(e) => updateNode(selectedNodeId, node => ({
                        ...node,
                        image: e.target.value,
                        imageType: 'url'
                      }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Image URL (e.g., from Pexels)..."
                    />
                    <div className="text-center">
                      <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {selectedNode.image && (
                      <div className="relative">
                        <img
                          src={selectedNode.image}
                          alt="Chapter"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => updateNode(selectedNodeId, node => ({ ...node, image: undefined, imageType: undefined }))}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Background Music */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Background Music
                  </label>
                  <div className="space-y-3">
                    <input
                      type="url"
                      value={selectedNode.musicType === 'url' ? selectedNode.backgroundMusic || '' : ''}
                      onChange={(e) => updateNode(selectedNodeId, node => ({
                        ...node,
                        backgroundMusic: e.target.value,
                        musicType: 'url'
                      }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Music URL (royalty-free)..."
                    />
                    <div className="text-center">
                      <label className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                        Upload Audio
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={handleMusicUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {selectedNode.backgroundMusic && (
                      <div className="flex items-center gap-2">
                        <audio
                          src={selectedNode.backgroundMusic}
                          controls
                          className="flex-1"
                        />
                        <button
                          onClick={() => updateNode(selectedNodeId, node => ({ ...node, backgroundMusic: undefined, musicType: undefined }))}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Text-to-Speech */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedNode.enableTTS || false}
                      onChange={(e) => updateNode(selectedNodeId, node => ({ ...node, enableTTS: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm font-medium text-gray-300">Enable Text-to-Speech</span>
                  </label>
                  {selectedNode.enableTTS && (
                    <button
                      onClick={testTTS}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      Test
                    </button>
                  )}
                </div>
              </div>

              {/* Choices */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Story Choices</h3>
                  <button
                    onClick={addChoice}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Choice
                  </button>
                </div>
                
                {selectedNode.choices.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>This chapter has no choices - it's an ending!</p>
                    <p className="text-sm mt-1">Add choices to continue the story.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedNode.choices.map((choice, index) => (
                      <div key={choice.id} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="text-purple-400 font-medium mt-2">{index + 1}.</span>
                          <div className="flex-1 space-y-3">
                            <input
                              type="text"
                              value={choice.text}
                              onChange={(e) => updateChoice(choice.id, 'text', e.target.value)}
                              className="w-full p-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Choice text..."
                            />
                            <select
                              value={choice.targetNodeId}
                              onChange={(e) => updateChoice(choice.id, 'targetNodeId', e.target.value)}
                              className="w-full p-2 bg-white/10 border border-white/20 rounded text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value="">Select destination chapter...</option>
                              {Object.entries(currentProject.story.nodes)
                                .filter(([nodeId]) => nodeId !== selectedNodeId)
                                .map(([nodeId, node]) => (
                                  <option key={nodeId} value={nodeId}>
                                    {node.title}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <button
                            onClick={() => deleteChoice(choice.id)}
                            className="p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Story Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  value={currentProject.story.title}
                  onChange={(e) => updateProject(project => ({
                    ...project,
                    story: { ...project.story, title: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={currentProject.story.description}
                  onChange={(e) => updateProject(project => ({
                    ...project,
                    story: { ...project.story, description: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
                  placeholder="Brief description of your story..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={currentProject.story.author}
                  onChange={(e) => updateProject(project => ({
                    ...project,
                    story: { ...project.story, author: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Starting Chapter
                </label>
                <select
                  value={currentProject.story.startNodeId}
                  onChange={(e) => updateProject(project => ({
                    ...project,
                    story: { ...project.story, startNodeId: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(currentProject.story.nodes).map(([nodeId, node]) => (
                    <option key={nodeId} value={nodeId}>
                      {node.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}