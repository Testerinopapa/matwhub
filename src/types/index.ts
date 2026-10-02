export type UserRole = 'EMPLOYEE' | 'CONTENT_EDITOR' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  job_title: string;
  department: string;
  location: string;
  country?: string;
  phone?: string;
  bio?: string;
  joined_date?: string;
  recognition_received_count?: number;
}

export type PostType = 
  | 'social' 
  | 'news' 
  | 'announcement' 
  | 'leadership' 
  | 'impact_story' 
  | 'recognition';

export interface PostComment {
  id: string;
  post_id: string;
  author: UserProfile;
  content: string;
  created_at: string;
  likes_count?: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voted_by_user?: boolean;
}

export interface PollData {
  id: string;
  question: string;
  options: PollOption[];
  total_votes: number;
  has_voted?: boolean;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  body: string;
  excerpt?: string;
  cover_image?: string;
  media_urls?: string[];
  author: UserProfile;
  published_at: string;
  category: string;
  tags: string[];
  audience?: string;
  featured?: boolean;
  pinned?: boolean;
  created_at: string;
  updated_at: string;
  reactions: {
    heart: number;
    clap: number;
    prayer: number;
    fire: number;
    user_reaction?: 'heart' | 'clap' | 'prayer' | 'fire' | null;
  };
  comments_count: number;
  comments?: PostComment[];
  poll?: PollData;
  recognition_details?: {
    recipient: UserProfile;
    achievement: string;
    badge_title: string;
    badge_icon: string;
  };
  impact_details?: {
    metric_value: string;
    metric_label: string;
    location: string;
  };
}

export type EventLocationType = 'virtual' | 'in_person' | 'hybrid';
export type RSVPStatus = 'going' | 'maybe' | 'declined';

export interface EventRSVP {
  event_id: string;
  user_id: string;
  status: RSVPStatus;
  user: UserProfile;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: 'Town Hall' | 'Campaign Launch' | 'Training' | 'Team Event' | 'Company Event' | 'Field Mission';
  banner_image?: string;
  start_time: string;
  end_time: string;
  location_type: EventLocationType;
  location_name: string;
  meeting_url?: string;
  organizer: UserProfile;
  rsvp_counts: {
    going: number;
    maybe: number;
    declined: number;
  };
  user_rsvp?: RSVPStatus | null;
  featured?: boolean;
}

export type ResourceCategory = 'brand' | 'employee';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  subcategory: string; // e.g., 'Logos & Guidelines', 'Campaign Assets', 'HR Policies', 'Forms & Templates'
  file_name: string;
  file_size: string;
  file_type: string; // 'pdf', 'png', 'svg', 'zip', 'docx'
  file_url: string;
  version: string;
  updated_at: string;
  uploader: UserProfile;
  downloads_count: number;
  is_featured?: boolean;
  tags: string[];
}

export interface ImpactMetric {
  id: string;
  key: string;
  label: string;
  value: string;
  numeric_value: number;
  icon_name: string;
  category: string;
  period_description: string;
  is_primary?: boolean;
  updated_at: string;
}

export interface AppNotification {
  id: string;
  type: 'reaction' | 'comment' | 'recognition' | 'announcement' | 'event_reminder';
  title: string;
  message: string;
  time_ago: string;
  is_read: boolean;
  action_url?: string;
  actor?: UserProfile;
}

export type NavigationTab = 
  | 'home' 
  | 'feed' 
  | 'impact' 
  | 'news' 
  | 'events' 
  | 'resources' 
  | 'recognition' 
  | 'leadership'
  | 'admin';
