// Mock Supabase client for demo purposes
// In a real app, this would connect to an actual Supabase backend

export const supabase = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      order: (column: string, options?: any) => ({
        then: (callback: (result: any) => void) => {
          // Return mock data based on table
          if (table === 'bookings') {
            callback({ data: [], error: null });
          }
          return Promise.resolve({ data: [], error: null });
        }
      }),
      eq: (column: string, value: any) => ({
        then: (callback: (result: any) => void) => {
          callback({ data: [], error: null });
          return Promise.resolve({ data: [], error: null });
        }
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  auth: {
    signUp: async (credentials: any) => {
      return { data: { user: null, session: null }, error: null };
    },
    signInWithPassword: async (credentials: any) => {
      // Mock successful login
      const mockUser = {
        id: 'mock-user-id',
        email: credentials.email,
        user_metadata: { full_name: 'Demo User' }
      };
      return { 
        data: { 
          user: mockUser, 
          session: { access_token: 'mock-token', user: mockUser } 
        }, 
        error: null 
      };
    },
    signOut: async () => {
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  }
};

export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

export type Session = {
  access_token: string;
  user: User;
};
