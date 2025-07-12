import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface MovieGenProps {
  onBack: () => void;
}

export default function MovieGen({ onBack }: MovieGenProps) {
  const [activeTab, setActiveTab] = useState<'trailer' | 'movie'>('trailer');

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
              <iframe
                src="https://ai-movie-trailer-generator--relaxedbison6224150.on.websim.com/"
                className="w-full h-[75vh] min-h-[600px] rounded-xl border-0"
                title="AI Movie Trailer Generator"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">🎬 AI Movie Maker</h2>
                <p className="text-gray-300">Create full-length movies with AI assistance</p>
              </div>
              <iframe
                src="https://aimoviemaker.on.websim.com/?v=2"
                className="w-full h-[75vh] min-h-[600px] rounded-xl border-0"
                title="AI Movie Maker"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
