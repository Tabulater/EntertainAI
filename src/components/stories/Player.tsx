import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, RotateCcw, BookOpen } from 'lucide-react';
import { StoryProject } from '../../types/story';
import { audioManager } from '../../utils/audio';

interface StoryPlayerProps {
  project: StoryProject;
  onBack: () => void;
}

export default function Player({ project, onBack }: StoryPlayerProps) {
  const [currentNodeId, setCurrentNodeId] = useState(project.story.startNodeId);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set([project.story.startNodeId]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [nodeHistory, setNodeHistory] = useState<Array<{ nodeId: string; title: string }>>([
    { nodeId: project.story.startNodeId, title: project.story.nodes[project.story.startNodeId]?.title || 'Start' }
  ]);

  const currentNode = project.story.nodes[currentNodeId];

  useEffect(() => {
    // Stop any existing audio when component mounts or unmounts
    return () => {
      audioManager.stopBackgroundMusic();
      audioManager.stopSpeaking();
    };
  }, []);

  useEffect(() => {
    // Cleanup function to stop audio when dependencies change
    return () => {
      audioManager.stopBackgroundMusic();
      audioManager.stopSpeaking();
    };
  }, [currentNodeId, currentNode]);

  useEffect(() => {
    if (currentNode) {
      // Handle background music
      if (currentNode.backgroundMusic) {
        audioManager.playBackgroundMusic(currentNode.backgroundMusic).catch(console.error);
      } else {
        audioManager.stopBackgroundMusic();
      }

      // Auto-play TTS if enabled
      if (currentNode.enableTTS && currentNode.content) {
        audioManager.speakText(currentNode.content);
      }
    }
  }, [currentNode]);

  const handleChoice = (targetNodeId: string) => {
    if (!project.story.nodes[targetNodeId]) return;

    const targetNode = project.story.nodes[targetNodeId];
    setCurrentNodeId(targetNodeId);
    setVisitedNodes(prev => new Set([...prev, targetNodeId]));
    setNodeHistory(prev => [...prev, { nodeId: targetNodeId, title: targetNode.title }]);
  };

  const restartStory = () => {
    setCurrentNodeId(project.story.startNodeId);
    setVisitedNodes(new Set([project.story.startNodeId]));
    setNodeHistory([{ nodeId: project.story.startNodeId, title: project.story.nodes[project.story.startNodeId]?.title || 'Start' }]);
    audioManager.stopBackgroundMusic();
    audioManager.stopSpeaking();
  };

  const goToNode = (nodeId: string) => {
    const nodeIndex = nodeHistory.findIndex(item => item.nodeId === nodeId);
    if (nodeIndex !== -1) {
      setCurrentNodeId(nodeId);
      setNodeHistory(prev => prev.slice(0, nodeIndex + 1));
      setShowHistory(false);
    }
  };

  const toggleTTS = () => {
    if (audioManager.isSpeaking()) {
      audioManager.stopSpeaking();
      setIsPlaying(false);
    } else if (currentNode?.content) {
      audioManager.speakText(currentNode.content);
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (currentNode?.backgroundMusic) {
      // This is a simple toggle - in a real app you'd want better audio state management
      audioManager.setBackgroundVolume(isPlaying ? 0 : 0.3);
    }
  };

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Chapter Not Found</h1>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isEnding = currentNode.choices.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Image */}
      {currentNode.image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${currentNode.image})` }}
        />
      )}
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{project.story.title}</h1>
                <p className="text-gray-300 text-sm">by {project.story.author}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative"
              >
                <BookOpen className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {visitedNodes.size}
                </span>
              </button>
              
              {currentNode.enableTTS && (
                <button
                  onClick={toggleTTS}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {audioManager.isSpeaking() ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              )}
              
              {currentNode.backgroundMusic && (
                <button
                  onClick={toggleMusic}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={restartStory}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-4xl mx-auto">
            {/* Chapter Image */}
            {currentNode.image && (
              <div className="mb-8 text-center">
                <img
                  src={currentNode.image}
                  alt={currentNode.title}
                  className="max-w-full max-h-96 mx-auto rounded-xl shadow-2xl border border-white/20"
                />
              </div>
            )}

            {/* Chapter Content */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {currentNode.title}
              </h2>
              
              <div className="prose prose-lg prose-invert max-w-none mb-8">
                <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-wrap">
                  {currentNode.content}
                </p>
              </div>

              {/* Choices or Ending */}
              {isEnding ? (
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-yellow-400 mb-4">
                    ✨ The End ✨
                  </div>
                  <p className="text-gray-300 mb-6">You've reached the end of this story path!</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={restartStory}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Start Over
                    </button>
                    <button
                      onClick={onBack}
                      className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Back to Library
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-6">What do you do next?</h3>
                  <div className="space-y-3">
                    {currentNode.choices.map((choice, index) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice.targetNodeId)}
                        disabled={!project.story.nodes[choice.targetNodeId]}
                        className="w-full p-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm text-white rounded-xl font-medium hover:from-blue-500/90 hover:to-purple-500/90 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 border border-white/20"
                      >
                        <span className="text-purple-200 mr-3">{index + 1}.</span>
                        {choice.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="fixed right-0 top-0 h-full w-80 bg-black/80 backdrop-blur-sm border-l border-white/20 p-6 z-50 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Story Path</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {nodeHistory.map((item, index) => (
                <button
                  key={`${item.nodeId}-${index}`}
                  onClick={() => goToNode(item.nodeId)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    item.nodeId === currentNodeId
                      ? 'bg-purple-600/50 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <span className="truncate">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-gray-400 text-sm text-center">
                {visitedNodes.size} of {Object.keys(project.story.nodes).length} chapters visited
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}