import React, { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';

interface MemeGenProps {
  onBack: () => void;
}

export default function MemeGen({ onBack }: MemeGenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const reloadIframe = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50">
      {/* Floating Header */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white hover:text-purple-300 transition-all duration-200 px-4 py-2 rounded-lg border border-white/20 hover:bg-black/50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>

      {/* Floating Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                AI Meme Generator
              </h1>
              <p className="text-gray-300 text-xs">Create the next viral sensation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
            <p className="text-white">Loading Meme Generator...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
          <div className="text-center p-6 bg-gray-900/90 rounded-lg max-w-md">
            <h3 className="text-xl font-bold text-red-400 mb-2">Failed to Load</h3>
            <p className="text-gray-300 mb-4">We couldn't load the meme generator. The service might be temporarily unavailable.</p>
            <button
              onClick={reloadIframe}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mx-auto transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Full Screen Iframe with Proxy */}
      <iframe
        key={iframeKey}
        src={`/api/proxy?path=`}
        className="w-full h-full border-0"
        title="AI Meme Generator"
        allow="camera; microphone; geolocation; clipboard-write; fullscreen"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-orientation-lock allow-pointer-lock"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          visibility: hasError ? 'hidden' : 'visible'
        }}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}