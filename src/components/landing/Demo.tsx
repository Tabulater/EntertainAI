import React, { useState } from 'react';
import { Play, SkipForward, Sparkles, BookOpen, Film, Users } from 'lucide-react';

interface DemoModeProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default Demo;

function Demo({ onComplete, onSkip }: DemoModeProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Welcome to the Future of Entertainment",
      description: "Create stories, movies, and trailers with AI - all in one platform",
      icon: Sparkles,
      action: "Start Your Journey"
    },
    {
      title: "Interactive Story Creation",
      description: "Build branching narratives with rich multimedia elements",
      icon: BookOpen,
      action: "Create Your First Story"
    },
    {
      title: "AI Movie Trailer Generator",
      description: "Transform your ideas into cinematic trailers instantly",
      icon: Film,
      action: "Generate a Trailer"
    },
    {
      title: "Full Movie Production",
      description: "Create complete movies with AI-powered scripts and visuals",
      icon: Play,
      action: "Make a Movie"
    },
    {
      title: "Ready to Create Magic?",
      description: "You now have access to the most advanced entertainment creation platform",
      icon: Users,
      action: "Start Creating"
    }
  ];

  const handleNext = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50 flex items-center justify-center p-6">
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full">
        <div className="text-center">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Step {currentStep + 1} of {demoSteps.length}</span>
              <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              {React.createElement(demoSteps[currentStep].icon, { className: "w-10 h-10 text-white" })}
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {demoSteps[currentStep].title}
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              {demoSteps[currentStep].description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
            >
              Skip Demo
            </button>
            
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {demoSteps[currentStep].action}
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 