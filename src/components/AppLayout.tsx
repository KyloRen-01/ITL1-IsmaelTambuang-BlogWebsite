import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Post } from '@/types/post';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import PostFeed from '@/components/PostFeed';
import PostDetail from '@/components/PostDetail';
import Dashboard from '@/components/Dashboard';
import PostEditor from '@/components/PostEditor';
import AuthModal from '@/components/AuthModal';

const AppLayout: React.FC = () => {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editPost, setEditPost] = useState<Post | null>(null);

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch public posts
  const fetchPublicPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts((data as Post[]) || []);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicPosts();
  }, [fetchPublicPosts]);

  // Navigation handler
  const handleNavigate = (page: string) => {
    if ((page === 'dashboard' || page === 'editor') && !user) {
      setAuthModalOpen(true);
      return;
    }
    setCurrentPage(page);
    setSelectedPostId(null);
    if (page !== 'editor') {
      setEditPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Post detail handler
  const handleReadMore = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Edit post handler - receives the full post object from Dashboard
  const handleEditPost = (postId: string) => {
    // Try to find in public posts first, then fetch from admin
    const found = posts.find(p => p.id === postId);
    if (found) {
      setEditPost(found);
      setCurrentPage('editor');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fetch from admin endpoint
      supabase.functions.invoke('manage-posts', {
        body: { action: 'list_all' }
      }).then(({ data }) => {
        if (data?.data) {
          const post = data.data.find((p: Post) => p.id === postId);
          if (post) {
            setEditPost(post);
            setCurrentPage('editor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('home');
  };

  // Post saved handler
  const handlePostSaved = () => {
    fetchPublicPosts();
    setCurrentPage('dashboard');
    setEditPost(null);
  };

  // Scroll to feed
  const handleExplore = () => {
    const feedEl = document.getElementById('feed');
    if (feedEl) {
      feedEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get selected post
  const selectedPost = posts.find(p => p.id === selectedPostId) || null;

  // Render current page
  const renderPage = () => {
    if (currentPage === 'post' && selectedPost) {
      return (
        <PostDetail
          post={selectedPost}
          onBack={() => handleNavigate('home')}
        />
      );
    }

    if (currentPage === 'dashboard') {
      if (!user) {
        return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
              <p className="text-slate-400 mb-6">Please sign in to access the dashboard.</p>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        );
      }
      return (
        <Dashboard
          onNewPost={() => { setEditPost(null); setCurrentPage('editor'); }}
          onEditPost={handleEditPost}
        />
      );
    }

    if (currentPage === 'editor') {
      if (!user) {
        return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center pt-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
              <p className="text-slate-400 mb-6">Please sign in to create posts.</p>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        );
      }
      return (
        <PostEditor
          editPost={editPost}
          onBack={() => handleNavigate('dashboard')}
          onSaved={handlePostSaved}
        />
      );
    }

    // Home page
    return (
      <>
        <HeroSection
          totalPosts={posts.length}
          onExplore={handleExplore}
        />
        <PostFeed
          posts={posts}
          loading={loading}
          onReadMore={handleReadMore}
        />
      </>
    );
  };

  const showFooter = currentPage === 'home' || currentPage === 'dashboard';

  return (
    <div className="min-h-screen bg-slate-900">
      <Header
        user={user}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className={currentPage === 'home' ? '' : ''}>
        {renderPage()}
      </main>

      {showFooter && (
        <Footer onNavigate={handleNavigate} />
      )}

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          fetchPublicPosts();
        }}
      />
    </div>
  );
};

export default AppLayout;
