import React, { useState, useEffect } from 'react';
import AuthModal from './components/auth/AuthModal';
import Landing from './components/landing/Landing';
import Dashboard from './components/dashboard/Dashboard';
import MovieGen from './components/movies/MovieGen';
import Library from './components/stories/Library';
import Editor from './components/stories/Editor';
import Player from './components/stories/Player';
import MemeGen from './components/memes/MemeGen';
import Demo from './components/landing/Demo';
import { StoryProject } from './types/story';
import { User, AuthState } from './types/auth';
import { storyStorage } from './utils/storage';
import { supabase } from './utils/supabase';

type AppView = 'dashboard' | 'stories' | 'movies' | 'memes' | 'editor' | 'player';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [currentProject, setCurrentProject] = useState<StoryProject | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const initStorage = async () => {
      try {
        await storyStorage.init();
        
        // Check for existing session
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setAuthState({
              user: {
                id: session.user.id,
                email: session.user.email!,
                name: session.user.user_metadata?.name,
                createdAt: session.user.created_at,
              },
              loading: false,
              error: null,
            });
          } else {
            setAuthState(prev => ({ ...prev, loading: false }));
            setShowAuthModal(true);
          }
        } else {
          // No Supabase configured, show auth modal
          setAuthState(prev => ({ ...prev, loading: false }));
          setShowAuthModal(true);
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize storage:', error);
        setAuthState(prev => ({ ...prev, loading: false, error: 'Failed to initialize' }));
        setIsInitialized(true);
      }
    };

    initStorage();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    if (!supabase) {
      // Demo mode - create a mock user
      const mockUser: User = {
        id: 'demo-user',
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };
      setAuthState({ user: mockUser, loading: false, error: null });
      setShowAuthModal(false);
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name,
            createdAt: data.user.created_at,
          },
          loading: false,
          error: null,
        });
        setShowAuthModal(false);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    if (!supabase) {
      // Demo mode - create a mock user
      const mockUser: User = {
        id: 'demo-user',
        email,
        name,
        createdAt: new Date().toISOString(),
      };
      setAuthState({ user: mockUser, loading: false, error: null });
      setShowAuthModal(false);
      return;
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      if (data.user) {
        setAuthState({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || name,
            createdAt: data.user.created_at,
          },
          loading: false,
          error: null,
        });
        setShowAuthModal(false);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setAuthState({ user: null, loading: false, error: null });
    setCurrentView('dashboard');
    setShowAuthModal(true);
  };

  const handleSelectStory = (project: StoryProject) => {
    setCurrentProject(project);
    setCurrentView('editor');
  };

  const handlePlayStory = (project: StoryProject) => {
    setCurrentProject(project);
    setCurrentView('player');
  };

  const handleBackToDashboard = () => {
    setCurrentProject(null);
    setCurrentView('dashboard');
  };

  const handleBackToStories = () => {
    setCurrentProject(null);
    setCurrentView('stories');
  };

  const handleNavigateToMemes = () => {
    setCurrentView('memes');
  };

  const handlePreview = (project: StoryProject) => {
    setCurrentProject(project);
    setCurrentView('player');
  };

  if (!isInitialized || authState.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white text-xl font-medium">Initializing EntertainAI...</p>
      </div>
    );
  }

  // Show auth modal if no user
  if (!authState.user) {
    return (
      <>
        <Landing 
          onGetStarted={() => setShowAuthModal(true)} 
          onWatchDemo={() => setShowDemo(true)}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSignIn={handleSignIn}
          onSignUp={handleSignUp}
          loading={authState.loading}
          error={authState.error}
        />
      </>
    );
  }

  switch (currentView) {
    case 'dashboard':
      return (
        <Dashboard
          user={authState.user}
          onSignOut={handleSignOut}
          onNavigateToStories={() => setCurrentView('stories')}
          onNavigateToMovies={() => setCurrentView('movies')}
          onNavigateToMemes={handleNavigateToMemes}
        />
      );

    case 'movies':
      return (
        <MovieGen
          onBack={handleBackToDashboard}
        />
      );

    case 'memes':
      return (
        <MemeGen
          onBack={handleBackToDashboard}
        />
      );

    case 'editor':
      return currentProject ? (
        <Editor
          project={currentProject}
          onBack={handleBackToStories}
          onPreview={handlePreview}
        />
      ) : null;

    case 'player':
      return currentProject ? (
        <Player
          project={currentProject}
          onBack={handleBackToDashboard}
        />
      ) : null;

    case 'stories':
    default:
      return (
        <Library
          onSelectStory={handleSelectStory}
          onPlayStory={handlePlayStory}
          onBack={handleBackToDashboard}
        />
      );
  }

  // Demo Modal
  if (showDemo) {
    return (
      <Demo
        onComplete={() => setShowDemo(false)}
        onSkip={() => setShowDemo(false)}
      />
    );
  }
}

export default App;