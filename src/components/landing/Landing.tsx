import React, { useState } from 'react';
import { Sparkles, BookOpen, Film, Users, ArrowRight, Star, CheckCircle, Play, Trophy, Code, Heart, Award, Image, Smile, Zap } from 'lucide-react';
import Privacy from '../legal/Privacy';
import Terms from '../legal/Terms';
import Contact from '../contact/Contact';

interface LandingPageProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
}

export default function Landing({ onGetStarted, onWatchDemo }: LandingPageProps) {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'contact'>('home');

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'privacy') {
    return <Privacy onBack={handleBackToHome} />;
  }

  if (currentPage === 'terms') {
    return <Terms onBack={handleBackToHome} />;
  }

  if (currentPage === 'contact') {
    return <Contact onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EntertainAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#hackathon" className="text-gray-300 hover:text-white transition-colors">United Hacks V5</a>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Try Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🎬 United Hacks V5 - Entertainment Theme
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block">
              Interactive Entertainment
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Pushing the boundaries of entertainment through emerging technologies and novel user experiences. 
            Create interactive stories, generate AI-powered content, and experience the next generation of digital entertainment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
              Experience Innovation
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onWatchDemo}
              className="flex items-center gap-2 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>United Hacks V5</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              <span>Entertainment Theme</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Revolutionary Entertainment Experiences
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enhancing how people create, consume, and interact with entertainment through cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story Builder Features */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Interactive Storytelling</h3>
              <p className="text-gray-300 mb-4">
                Create immersive branching narratives that adapt to user choices, revolutionizing how stories are told and experienced.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Dynamic story branching</li>
                <li>• Real-time adaptation</li>
                <li>• Immersive narratives</li>
                <li>• User-driven plots</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Movie Generation</h3>
              <p className="text-gray-300 mb-4">
                Transform ideas into stunning visual content using advanced AI, creating movie posters and trailers instantly.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Instant visual creation</li>
                <li>• AI-powered design</li>
                <li>• Professional quality</li>
                <li>• Creative automation</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6">
                <Smile className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Viral Content Creation</h3>
              <p className="text-gray-300 mb-4">
                Generate trending memes and viral content with AI assistance, making entertainment creation accessible to everyone.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• AI meme generation</li>
                <li>• Trend analysis</li>
                <li>• Viral potential</li>
                <li>• Instant sharing</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Social Entertainment Hub</h3>
              <p className="text-gray-300 mb-4">
                Discover, share, and engage with entertainment content in a collaborative community environment.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Community discovery</li>
                <li>• Social interaction</li>
                <li>• Content curation</li>
                <li>• Collaborative creation</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                <Image className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Personalized Discovery</h3>
              <p className="text-gray-300 mb-4">
                AI-powered content recommendations that understand your entertainment preferences and suggest new experiences.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Smart recommendations</li>
                <li>• Personalized feeds</li>
                <li>• Content discovery</li>
                <li>• Preference learning</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Emerging Technologies</h3>
              <p className="text-gray-300 mb-4">
                Built with cutting-edge web technologies to deliver smooth, responsive, and engaging entertainment experiences.
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• React 18 + TypeScript</li>
                <li>• Modern UI/UX</li>
                <li>• Real-time interactions</li>
                <li>• Cross-platform</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How Entertainment Innovation Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of entertainment through our innovative creation and consumption workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Experience</h3>
              <p className="text-gray-300">
                Select from interactive storytelling, AI content generation, or viral meme creation to start your entertainment journey.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Create & Innovate</h3>
              <p className="text-gray-300">
                Use our intuitive tools to craft unique entertainment experiences or let AI enhance your creative vision.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Share & Engage</h3>
              <p className="text-gray-300">
                Share your creations with the community and discover innovative entertainment from fellow creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Section */}
      <section id="hackathon" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              United Hacks V5 - Entertainment Theme
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pushing the boundaries of what's possible in the entertainment industry through emerging technologies and novel user experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <h3 className="text-2xl font-bold text-white">United Hacks V5</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  EntertainAI was built for United Hacks V5 under the Entertainment theme to showcase how emerging technologies 
                  can revolutionize how people create, consume, and interact with entertainment. This project demonstrates 
                  the potential of AI and modern web technologies in pushing entertainment boundaries.
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Interactive Storytelling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>AI Content Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Emerging Technologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Novel User Experiences</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-red-400" />
                  <h3 className="text-2xl font-bold text-white">Created by Aashrith Raj Tatipamula</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  This entertainment innovation project was developed by Aashrith Raj Tatipamula for United Hacks V5 to demonstrate how 
                  technology can enhance entertainment experiences. The platform showcases creative problem-solving, 
                  innovative thinking, and the potential of AI in revolutionizing digital entertainment.
                </p>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Entertainment Innovation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Emerging Technologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>AI Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Creative Problem Solving</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience the Future of Entertainment
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Try out this United Hacks V5 Entertainment theme project and see how emerging technologies can transform digital entertainment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Try the Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => window.open('https://github.com/Tabulater/EntertainAI', '_blank')}
              className="border border-white/20 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source Code
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mt-6">
            Built with ❤️ by Aashrith Raj Tatipamula for United Hacks V5 Entertainment Innovation
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EntertainAI</span>
            </div>
            
            <div className="flex items-center gap-6 text-gray-400">
              <button 
                onClick={() => setCurrentPage('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => setCurrentPage('terms')}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EntertainAI. United Hacks V5 Entertainment theme project by Aashrith Raj Tatipamula. Pushing entertainment boundaries.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}