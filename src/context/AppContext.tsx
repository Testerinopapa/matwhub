import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  Post, 
  EventItem, 
  ResourceItem, 
  ImpactMetric, 
  AppNotification, 
  NavigationTab,
  RSVPStatus 
} from '../types';
import { 
  CURRENT_USER, 
  STAFF_MEMBERS, 
  MOCK_POSTS, 
  MOCK_EVENTS, 
  MOCK_RESOURCES, 
  MOCK_IMPACT_METRICS, 
  MOCK_NOTIFICATIONS 
} from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AppContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  posts: Post[];
  events: EventItem[];
  resources: ResourceItem[];
  impactMetrics: ImpactMetric[];
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isRecogniseModalOpen: boolean;
  setIsRecogniseModalOpen: (open: boolean) => void;
  
  // Actions
  toggleReaction: (postId: string, type: 'heart' | 'clap' | 'prayer' | 'fire') => void;
  addComment: (postId: string, content: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  rsvpEvent: (eventId: string, status: RSVPStatus) => void;
  addPost: (newPost: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  recogniseColleague: (recipientId: string, message: string, badgeTitle: string, achievement: string) => void;
  updateImpactMetric: (metricId: string, newValue: string, newNumeric: number) => void;
  addResource: (newRes: Partial<ResourceItem>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for local storage persistence
const getStoredState = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setStoredState = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Ignore storage quota or disabled errors
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('ADMIN');
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    ...CURRENT_USER,
    role: 'ADMIN',
  });
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  // Hydrate state with localStorage fallback
  const [posts, setPosts] = useState<Post[]>(() => getStoredState('matw_posts', MOCK_POSTS));
  const [events, setEvents] = useState<EventItem[]>(() => getStoredState('matw_events', MOCK_EVENTS));
  const [resources, setResources] = useState<ResourceItem[]>(() => getStoredState('matw_resources', MOCK_RESOURCES));
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>(() => getStoredState('matw_impact_metrics', MOCK_IMPACT_METRICS));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getStoredState('matw_notifications', MOCK_NOTIFICATIONS));
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isRecogniseModalOpen, setIsRecogniseModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => { setStoredState('matw_posts', posts); }, [posts]);
  useEffect(() => { setStoredState('matw_events', events); }, [events]);
  useEffect(() => { setStoredState('matw_resources', resources); }, [resources]);
  useEffect(() => { setStoredState('matw_impact_metrics', impactMetrics); }, [impactMetrics]);
  useEffect(() => { setStoredState('matw_notifications', notifications); }, [notifications]);

  // Sync role changes
  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    setCurrentUser(prev => ({ ...prev, role }));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.is_read).length;

  // Supabase background sync on initial load
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const loadRemoteData = async () => {
      try {
        // Fetch remote impact metrics if table exists
        const { data: remoteMetrics, error: metricsErr } = await supabase
          .from('impact_metrics')
          .select('*')
          .order('sort_order', { ascending: true });

        if (!metricsErr && remoteMetrics && remoteMetrics.length > 0) {
          setImpactMetrics(prev => {
            const mapped: ImpactMetric[] = remoteMetrics.map((rm: any) => ({
              id: rm.id,
              key: rm.metric_key || rm.id,
              label: rm.label,
              value: rm.value,
              numeric_value: Number(rm.numeric_value),
              icon_name: rm.icon_name || 'Heart',
              category: rm.category,
              period_description: rm.period || 'Lifetime',
              updated_at: rm.updated_at || new Date().toISOString()
            }));
            return mapped;
          });
        }
      } catch (err) {
        // Graceful fallback to mock data / local cache
        console.info('Supabase syncing initialized with local cache fallback.');
      }
    };

    loadRemoteData();
  }, []);

  const toggleReaction = (postId: string, type: 'heart' | 'clap' | 'prayer' | 'fire') => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const currentReaction = p.reactions.user_reaction;
      const isSame = currentReaction === type;
      
      const newReactions = { ...p.reactions };
      if (currentReaction) {
        newReactions[currentReaction] = Math.max(0, newReactions[currentReaction] - 1);
      }
      if (!isSame) {
        newReactions[type] = (newReactions[type] || 0) + 1;
        newReactions.user_reaction = type;
      } else {
        newReactions.user_reaction = null;
      }
      return { ...p, reactions: newReactions };
    }));
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const newComment = {
        id: `c-${Date.now()}`,
        post_id: postId,
        author: currentUser,
        content: content.trim(),
        created_at: 'Just now',
        likes_count: 0
      };
      return {
        ...p,
        comments_count: (p.comments_count || 0) + 1,
        comments: [...(p.comments || []), newComment]
      };
    }));
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId || !p.poll || p.poll.has_voted) return p;
      const updatedOptions = p.poll.options.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1, voted_by_user: true };
        }
        return opt;
      });
      return {
        ...p,
        poll: {
          ...p.poll,
          options: updatedOptions,
          total_votes: p.poll.total_votes + 1,
          has_voted: true
        }
      };
    }));
  };

  const rsvpEvent = (eventId: string, status: RSVPStatus) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id !== eventId) return ev;
      const oldStatus = ev.user_rsvp;
      const counts = { ...ev.rsvp_counts };
      
      if (oldStatus) {
        counts[oldStatus] = Math.max(0, counts[oldStatus] - 1);
      }
      counts[status] = (counts[status] || 0) + 1;
      
      return {
        ...ev,
        user_rsvp: status,
        rsvp_counts: counts
      };
    }));
  };

  const addPost = (newPostData: Partial<Post>) => {
    const post: Post = {
      id: `post-${Date.now()}`,
      type: newPostData.type || 'social',
      title: newPostData.title || 'Team Update',
      body: newPostData.body || '',
      excerpt: newPostData.excerpt || newPostData.body?.slice(0, 120),
      cover_image: newPostData.cover_image,
      media_urls: newPostData.media_urls || (newPostData.cover_image ? [newPostData.cover_image] : []),
      author: currentUser,
      published_at: 'Just now',
      category: newPostData.category || 'General',
      tags: newPostData.tags || ['OneTeam'],
      featured: !!newPostData.featured,
      pinned: !!newPostData.pinned,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reactions: { heart: 1, clap: 1, prayer: 2, fire: 0, user_reaction: 'heart' },
      comments_count: 0,
      comments: [],
      impact_details: newPostData.impact_details,
      recognition_details: newPostData.recognition_details,
    };
    setPosts(prev => [post, ...prev]);

    // Async attempt to persist to Lovable Cloud if configured
    if (isSupabaseConfigured()) {
      (async () => {
        try {
          await supabase.from('posts').insert({
            type: post.type,
            title: post.title,
            body: post.body,
            excerpt: post.excerpt,
            image_url: post.cover_image,
            category: post.category,
            featured: post.featured,
            pinned: post.pinned,
          });
        } catch (e) {
          // Fallback to local storage
        }
      })();
    }
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (isSupabaseConfigured()) {
      (async () => {
        try {
          await supabase.from('posts').delete().eq('id', postId);
        } catch (e) {
          // Fallback to local storage
        }
      })();
    }
  };

  const recogniseColleague = (recipientId: string, message: string, badgeTitle: string, achievement: string) => {
    const recipient = Object.values(STAFF_MEMBERS).find(s => s.id === recipientId) || STAFF_MEMBERS.tariq;
    
    // Create recognition post
    addPost({
      type: 'recognition',
      title: `Recognition for ${recipient.name}: ${achievement}`,
      body: message,
      excerpt: `${currentUser.name} recognized ${recipient.name} for ${achievement}`,
      category: 'Employee Kudos',
      tags: ['Recognition', 'Celebration', 'OneTeam'],
      recognition_details: {
        recipient,
        achievement,
        badge_title: badgeTitle || 'Champion of Sincerity',
        badge_icon: 'Award'
      }
    });

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'recognition',
      title: 'Recognition Broadcast Published',
      message: `You celebrated ${recipient.name} for "${achievement}"!`,
      time_ago: 'Just now',
      is_read: false,
      actor: currentUser
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateImpactMetric = (metricId: string, newValue: string, newNumeric: number) => {
    setImpactMetrics(prev => prev.map(m => {
      if (m.id !== metricId) return m;
      return {
        ...m,
        value: newValue,
        numeric_value: newNumeric,
        updated_at: new Date().toISOString()
      };
    }));

    if (isSupabaseConfigured()) {
      (async () => {
        try {
          await supabase.from('impact_metrics').update({
            value: newValue,
            numeric_value: newNumeric,
            updated_at: new Date().toISOString()
          }).eq('id', metricId);
        } catch (e) {
          // Fallback to local storage
        }
      })();
    }
  };

  const addResource = (newRes: Partial<ResourceItem>) => {
    const res: ResourceItem = {
      id: `res-${Date.now()}`,
      title: newRes.title || 'Untitled Resource',
      description: newRes.description || '',
      category: newRes.category || 'brand',
      subcategory: newRes.subcategory || 'General',
      file_name: newRes.file_name || 'document.pdf',
      file_size: newRes.file_size || '1.2 MB',
      file_type: newRes.file_type || 'pdf',
      file_url: '#',
      version: newRes.version || 'v1.0',
      updated_at: new Date().toISOString().split('T')[0],
      uploader: currentUser,
      downloads_count: 0,
      tags: newRes.tags || ['Document']
    };
    setResources(prev => [res, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        posts,
        events,
        resources,
        impactMetrics,
        notifications,
        unreadNotificationsCount,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isRecogniseModalOpen,
        setIsRecogniseModalOpen,
        toggleReaction,
        addComment,
        votePoll,
        rsvpEvent,
        addPost,
        deletePost,
        recogniseColleague,
        updateImpactMetric,
        addResource,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
