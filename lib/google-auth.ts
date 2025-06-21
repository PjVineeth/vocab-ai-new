// Google OAuth Configuration and Utilities
export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token?: string;
}

export class GoogleAuth {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    this.redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 
      `${typeof window !== 'undefined' ? window.location.origin : ''}/api/auth/callback/google`;
  }

  // Generate the Google OAuth URL for login
  getAuthUrl(): string {
    const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `${baseUrl}?${params.toString()}`;
  }

  // Exchange authorization code for access token
  async exchangeCodeForTokens(code: string): Promise<AuthTokens> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Get user information using access token
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
    
    const response = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    const userData = await response.json();
    
    // Debug: Log the raw response from Google
    // console.log('Raw Google userinfo response:', userData);
    
    // Google API might return 'picture' field, make sure we handle it correctly
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture, // This should contain the profile picture URL
      given_name: userData.given_name,
      family_name: userData.family_name,
    };
  }
}

// Client-side auth functions
export const googleAuth = new GoogleAuth();

// Redirect to Google OAuth
export const signInWithGoogle = () => {
  if (typeof window !== 'undefined') {
    window.location.href = googleAuth.getAuthUrl();
  }
};

// Store user session in localStorage (you might want to use a more secure method)
export const storeUserSession = (user: GoogleUser, tokens: AuthTokens) => {
  if (typeof window !== 'undefined') {
    const session = {
      user,
      tokens,
      expiresAt: Date.now() + (tokens.expires_in * 1000),
    };
    localStorage.setItem('google_auth_session', JSON.stringify(session));
  }
};

// Get user session from localStorage
export const getUserSession = () => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('google_auth_session');
    if (session) {
      const parsed = JSON.parse(session);
      // Check if session is expired
      if (parsed.expiresAt > Date.now()) {
        return parsed;
      } else {
        // Session expired, remove it
        localStorage.removeItem('google_auth_session');
      }
    }
  }
  return null;
};

// Clear user session
export const clearUserSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('google_auth_session');
  }
};

// Save user email to database (you'll need to implement this)
export const saveUserToDatabase = async (user: GoogleUser) => {
  try {
    const response = await fetch('/api/auth/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        picture: user.picture,
        googleId: user.id,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save user to database');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
}; 