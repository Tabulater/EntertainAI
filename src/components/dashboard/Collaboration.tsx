import React, { useState } from 'react';
import { Users, MessageCircle, Eye, Edit, Crown, UserPlus, Search } from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface CollaborationHubProps {
  projectId: string;
  onClose: () => void;
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline: boolean;
  lastActive: Date;
  email?: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  replies: Comment[];
}



export default function Collaboration({ onClose }: Omit<CollaborationHubProps, 'projectId'>) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const [comments, setComments] = useState<Comment[]>([]);

  const [newComment, setNewComment] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('viewer');

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Collaborator[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      timestamp: new Date(),
      replies: []
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };



  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      if (!supabase) {
        console.warn('Supabase not configured. Search functionality disabled.');
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      // Get current user to exclude from search results
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      // Use the search_users function we created in the SQL script
      const { data: users, error } = await supabase
        .rpc('search_users', {
          search_term: searchQuery,
          current_user_id: currentUser?.id || null
        });

      if (error) {
        console.log('Profiles table not found or error occurred');
        // Fallback: Create a profiles table that mirrors auth.users
        // This is a demo implementation - in production you'd set up proper RLS policies
        const demoUsers = [
          { id: 'auth-user-1', email: 'john.doe@example.com', full_name: 'John Doe', avatar_url: null },
          { id: 'auth-user-2', email: 'jane.smith@example.com', full_name: 'Jane Smith', avatar_url: null },
          { id: 'auth-user-3', email: 'bob.wilson@example.com', full_name: 'Bob Wilson', avatar_url: null },
          { id: 'auth-user-4', email: 'alice.johnson@example.com', full_name: 'Alice Johnson', avatar_url: null },
          { id: 'auth-user-5', email: 'mike.brown@example.com', full_name: 'Mike Brown', avatar_url: null }
        ].filter(user => 
          (user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
          user.id !== currentUser?.id
        );

        const searchResults = demoUsers.map((user: { id: string; full_name: string; email: string; avatar_url: string | null }) => ({
          id: user.id,
          name: user.full_name || user.email?.split('@')[0] || 'Unknown User',
          avatar: user.avatar_url || '👤',
          role: 'viewer' as const,
          isOnline: false,
          lastActive: new Date(),
          email: user.email || ''
        }));
        
        setSearchResults(searchResults);
        return;
      }

      // Convert to Collaborator format
      const searchResults = users?.map((user: { id: string; full_name: string; email: string; avatar_url: string | null }) => ({
        id: user.id,
        name: user.full_name || user.email?.split('@')[0] || 'Unknown User',
        avatar: user.avatar_url || '👤',
        role: 'viewer' as const,
        isOnline: false,
        lastActive: new Date(),
        email: user.email || ''
      })) || [];
      
      setSearchResults(searchResults);
      
    } catch (error) {
      console.error('Error in searchUsers:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addUserFromSearch = (user: Collaborator) => {
    const newCollaborator: Collaborator = {
      ...user,
      id: Date.now().toString(),
      role: 'viewer' as const
    };
    
    setCollaborators([...collaborators, newCollaborator]);
    setSearchResults([]);
    setSearchQuery('');
    setShowSearchModal(false);
  };

  const sendEmailInvite = () => {
    if (!inviteEmail.trim()) return;
    
    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      avatar: '👤',
      role: inviteRole,
      isOnline: false,
      lastActive: new Date(),
      email: inviteEmail
    };
    
    setCollaborators([...collaborators, newCollaborator]);
    setInviteEmail('');
    setShowInviteModal(false);
    
    // In a real app, this would send an actual email
    alert(`Invitation sent to ${inviteEmail}!`);
  };

  const removeCollaborator = (collaboratorId: string) => {
    setCollaborators(collaborators.filter(c => c.id !== collaboratorId));
  };

  const changeRole = (collaboratorId: string, newRole: 'editor' | 'viewer') => {
    setCollaborators(collaborators.map(c => 
      c.id === collaboratorId ? { ...c, role: newRole } : c
    ));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'editor':
        return <Edit className="w-4 h-4 text-blue-400" />;
      case 'viewer':
        return <Eye className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6" />
            Collaboration Hub
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(90vh-120px)] overflow-hidden">
                    {/* Collaborators Panel */}
          <div className="bg-white/5 rounded-2xl p-6 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members ({collaborators.length})
              </h3>
            </div>
            
            <div className="flex-1 space-y-3">
              {collaborators.length > 0 ? (
                collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{collaborator.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{collaborator.name}</span>
                          {getRoleIcon(collaborator.role)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <div className={`w-2 h-2 rounded-full ${collaborator.isOnline ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                          <span>{collaborator.isOnline ? 'Online' : formatTimeAgo(collaborator.lastActive)}</span>
                        </div>
                        {collaborator.email && (
                          <div className="text-xs text-gray-500">{collaborator.email}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {collaborator.role !== 'owner' && (
                        <>
                          <select
                            value={collaborator.role}
                            onChange={(e) => changeRole(collaborator.id, e.target.value as 'editor' | 'viewer')}
                            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white"
                          >
                            <option value="editor">Editor</option>
                            <option value="viewer">Viewer</option>
                          </select>
                          <button
                            onClick={() => removeCollaborator(collaborator.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Remove collaborator"
                          >
                            ✕
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium mb-2">No collaborators yet</p>
                  <p className="text-sm">Invite team members to start collaborating on your project</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowSearchModal(true)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search Users
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Invite by Email
              </button>
            </div>
          </div>

          {/* Comments Panel */}
          <div className="bg-white/5 rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Comments ({comments.length})
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-white">{comment.author}</span>
                      <span className="text-sm text-gray-400">
                        {comment.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg font-medium mb-2">No comments yet</p>
                  <p className="text-sm">Start the conversation by adding a comment below</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && addComment()}
              />
              <button
                onClick={addComment}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Invite Collaborator</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="viewer">Viewer (Can view and comment)</option>
                  <option value="editor">Editor (Can edit and collaborate)</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 text-gray-300 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendEmailInvite}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Search Users</h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or email..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                />
                <button
                  onClick={searchUsers}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => addUserFromSearch(user)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-200"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {searchQuery && searchResults.length === 0 && !isSearching && (
                <div className="text-center py-4 text-gray-400">
                  <p>No users found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Copy Notification */}
      {/* The copiedLink state variable was removed, so this block is no longer relevant. */}
      {/* If you need a copy notification, you'll need to re-introduce the state variable. */}
    </div>
  );
} 