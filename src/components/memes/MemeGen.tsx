import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface MemeGenProps {
  onBack: () => void;
}

export default function MemeGen({ onBack }: MemeGenProps) {
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

      {/* Full Screen Iframe */}
      <iframe
        src="https://ai-meme-generator--immensepuma9566129.on.websim.com/"
        className="w-full h-full border-0"
        title="AI Meme Generator"
        allow="camera; microphone; geolocation; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
    </div>
  );
} 