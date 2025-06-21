import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from '@/lib/google-auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/?error=oauth_error', request.url));
  }

  // Handle missing authorization code
  if (!code) {
    console.error('No authorization code provided');
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    const googleAuth = new GoogleAuth();
    
    // Exchange code for tokens
    const tokens = await googleAuth.exchangeCodeForTokens(code);
    
    // Debug: Log the JWT tokens received from Google
    console.log('🔐 JWT Tokens received from Google:');
    // console.log('Access Token:', tokens.access_token);
    if (tokens.id_token) {
      console.log('ID Token (JWT):', tokens.id_token);
      // console.log('Full JWT Object:', JSON.stringify({ id_token: tokens.id_token }, null, 2));
    }
    // console.log('Token Type:', tokens.token_type);
    // console.log('Expires In:', tokens.expires_in);
    // console.log('Scope:', tokens.scope);
    
    // Get user information
    const user = await googleAuth.getUserInfo(tokens.access_token);
    
    // Debug: Log the complete user object from Google
    // console.log('Complete Google user data:', JSON.stringify(user, null, 2));
    
    // Create a session object
    const session = {
      user,
      tokens,
      expiresAt: Date.now() + (tokens.expires_in * 1000),
    };

    // Create the redirect URL with session data
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('auth_success', 'true');
    redirectUrl.searchParams.set('session', encodeURIComponent(JSON.stringify(session)));

    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
} 