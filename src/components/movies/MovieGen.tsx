import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, AlertTriangle, Film, Clapperboard } from 'lucide-react';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface MovieGenProps {
  onBack: () => void;
}

const MovieIframe = ({ url, onLoad, onError }: { 
  url: string; 
  onLoad: () => void; 
  onError: () => void;
}) => (
  <div className="relative w-full h-full">
    <iframe
      src={url}
      className="w-full h-full border-0"
      title="AI Movie Generator"
      allow="camera; microphone; clipboard-write; fullscreen"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-orientation-lock allow-pointer-lock"
      onLoad={onLoad}
      onError={onError}
      referrerPolicy="strict-origin-when-cross-origin"
    />
  </div>
);

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
    <ErrorBoundary>
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50">
        {/* Header */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white hover:text-purple-300 transition-all duration-200 px-4 py-2 rounded-lg border border-white/20 hover:bg-black/50"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('trailer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'trailer' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              <Film className="w-4 h-4" />
              Trailer Generator
            </button>
            <button
              onClick={() => setActiveTab('movie')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'movie' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
            >
              <Clapperboard className="w-4 h-4" />
              Movie Generator
            </button>
          </div>
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-white">Loading {activeTab === 'trailer' ? 'Trailer' : 'Movie'} Generator...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
            <div className="text-center p-6 bg-gray-900/90 rounded-lg max-w-md">
              <h3 className="text-xl font-bold text-red-400 mb-2">Failed to Load</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => {
                  setIframeKey(prev => prev + 1);
                  setError(null);
                  setIsLoading(true);
                }}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mx-auto transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
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
