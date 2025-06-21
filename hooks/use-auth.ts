import { useState, useEffect } from 'react';
import { 
  signInWithGoogle, 
  getUserSession, 
  clearUserSession, 
  storeUserSession,
  saveUserToDatabase,
  GoogleUser,
  AuthTokens
} from '@/lib/google-auth';

interface AuthSession {
  user: GoogleUser;
  tokens: AuthTokens;
  expiresAt: number;
}

interface UseAuthReturn {
  user: GoogleUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshSession: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const session = getUserSession();
      if (session) {
        setUser(session.user);
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleAuthCallback = async () => {
      if (typeof window === 'undefined') return;

      const urlParams = new URLSearchParams(window.location.search);
      const authSuccess = urlParams.get('auth_success');
      const sessionData = urlParams.get('session');

      if (authSuccess === 'true' && sessionData) {
        try {
          const session: AuthSession = JSON.parse(decodeURIComponent(sessionData));
          
          // Debug: Log JWT tokens from session
          console.log('🔐 JWT Tokens from OAuth callback session:');
          if (session.tokens.id_token) {
            console.log('ID Token (JWT):', session.tokens.id_token);
            // console.log('Full JWT Object:', JSON.stringify({ id_token: session.tokens.id_token }, null, 2));
          }
          // console.log('Session tokens:', JSON.stringify(session.tokens, null, 2));
          
          // Store session in localStorage
          storeUserSession(session.user, session.tokens);
          
          // Save user to database
          await saveUserToDatabase(session.user);
          
          // Update state
          setUser(session.user);
          
          // Clean up URL parameters
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, '', cleanUrl);
          
        } catch (error) {
          console.error('Error processing auth callback:', error);
        }
      }

      // Handle errors
      const error = urlParams.get('error');
      if (error) {
        console.error('Auth error:', error);
        // You might want to show a toast or notification here
        
        // Clean up URL parameters
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
      }
    };

    handleAuthCallback();
  }, []);

  const login = () => {
    signInWithGoogle();
  };

  const logout = async () => {
    try {
      // Clear server-side user data
      await fetch('/api/auth/user', {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error clearing server-side user data:', error);
    }
    
    clearUserSession();
    setUser(null);
    // Optionally redirect to home page or refresh
    window.location.reload();
  };

  const refreshSession = () => {
    const session = getUserSession();
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshSession,
  };
} 