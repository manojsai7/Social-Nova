import { Database } from './database.types';

// Mock Supabase client for prototype purposes
export const supabase = {
  auth: {
    getUser: async () => ({
      data: { user: { id: 'mock-user-id', email: 'mock@example.com' } },
      error: null,
    }),
    signOut: async () => ({ error: null }),
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      console.log(`Mock signInWithPassword called with email: ${email}, password: ${password}`);
      return { error: null };
    },
    signUp: async ({ email, password }: { email: string; password: string }) => {
      console.log(`Mock signUp called with email: ${email}, password: ${password}`);
      return { error: null };
    },
    onAuthStateChange: (callback: any) => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },
  from: (table: string) => ({
    select: () => ({
      order: () => ({
        range: async () => ({
          data: [
            {
              id: 'mock-post-id',
              media_url: 'https://via.placeholder.com/150',
              media_type: 'image',
              caption: 'Mock caption',
              created_at: new Date().toISOString(),
              likes_count: 10,
              comments_count: 5,
              user: {
                id: 'mock-user-id',
                username: 'mockuser',
                avatar_url: null,
              },
            },
          ],
          error: null,
        }),
      }),
    }),
    insert: async () => ({ error: null }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ error: null }),
      getPublicUrl: () => ({
        data: { publicUrl: 'https://via.placeholder.com/150' },
      }),
    }),
  },
};

export const getSignedInUser = async () => {
  return { id: 'mock-user-id', email: 'mock@example.com' };
};

export const signOut = async () => {
  console.log('Mock sign out');
};

export const createClient = () => {
  console.log('Mock createClient called');
  return supabase;
};
