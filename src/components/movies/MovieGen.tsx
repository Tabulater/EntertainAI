import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

interface MovieGenProps {
  onBack: () => void;
}

export default function MovieGen({ onBack }: MovieGenProps) {
  const [activeTab, setActiveTab] = useState<'trailer' | 'movie'>('trailer');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const urls = {
    trailer: 'https://ai-movie-trailer-generator--relaxedbison6224150.on.websim.com',
    movie: 'https://aimoviemaker.on.websim.com/?v=2'
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load the movie generator. Please try again.');
  };

  const reloadIframe = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎬 AI Movie Studio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create stunning movie trailers and full-length films with AI
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-1 flex">
            <button
              onClick={() => setActiveTab('trailer')}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'trailer'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              🎬 Movie Trailer Generator
            </button>
            <button
              onClick={() => setActiveTab('movie')}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === 'movie'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              🎭 Movie Maker
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-4 overflow-hidden">
          {activeTab === 'trailer' ? (
            <div>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">🎬 AI Movie Trailer Generator</h2>
                <p className="text-gray-300">Create cinematic trailers from your story ideas</p>
              </div>
              <div className="relative w-full h-[75vh] min-h-[600px] rounded-xl overflow-hidden bg-black/30 border border-white/10">
                {isLoading && activeTab === 'trailer' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                      <p className="text-white">Loading Movie Trailer Generator...</p>
                    </div>
                  </div>
                )}
                {error && activeTab === 'trailer' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 p-4">
                    <div className="text-center bg-red-900/50 p-6 rounded-lg max-w-md">
                      <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                      <h3 className="text-lg font-bold text-white mb-2">Failed to Load</h3>
                      <p className="text-red-200 mb-4">{error}</p>
                      <button
                        onClick={reloadIframe}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 mx-auto"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
                <iframe
                  key={`trailer-${iframeKey}`}
                  src={urls.trailer}
                  className="w-full h-full rounded-xl border-0"
                  title="AI Movie Trailer Generator"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  style={{ visibility: error && activeTab === 'trailer' ? 'hidden' : 'visible' }}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">🎬 AI Movie Maker</h2>
                <p className="text-gray-300">Create full-length movies with AI assistance</p>
              </div>
              <div className="relative w-full h-[75vh] min-h-[600px] rounded-xl overflow-hidden bg-black/30 border border-white/10">
                {isLoading && activeTab === 'movie' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                      <p className="text-white">Loading Movie Maker...</p>
                    </div>
                  </div>
                )}
                {error && activeTab === 'movie' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 p-4">
                    <div className="text-center bg-red-900/50 p-6 rounded-lg max-w-md">
                      <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                      <h3 className="text-lg font-bold text-white mb-2">Failed to Load</h3>
                      <p className="text-red-200 mb-4">{error}</p>
                      <button
                        onClick={reloadIframe}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 mx-auto"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
                <iframe
                  key={`movie-${iframeKey}`}
                  src={urls.movie}
                  className="w-full h-full rounded-xl border-0"
                  title="AI Movie Maker"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  style={{ visibility: error && activeTab === 'movie' ? 'hidden' : 'visible' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
