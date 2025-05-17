export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          media_url: string;
          media_type: string;
          caption: string | null;
          likes_count: number;
          comments_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          media_url: string;
          media_type: string;
          caption?: string | null;
          likes_count?: number;
          comments_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          media_url?: string;
          media_type?: string;
          caption?: string | null;
          likes_count?: number;
          comments_count?: number;
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          avatar_url: string | null;
          bio: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          username: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          username?: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
      };
    };
  };
}
