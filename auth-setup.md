# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your VocabAI application.

## Prerequisites

1. A Google Cloud Console account
2. A project in Google Cloud Console

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure your OAuth consent screen if you haven't already
6. Select "Web application" as the application type
7. Add authorized redirect URIs:
   - For local development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
8. Copy the Client ID and Client Secret

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
```

## Step 3: OAuth Consent Screen Configuration

1. In Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
2. Configure your app information:
   - App name: VocabAI
   - User support email: your email
   - Developer contact information: your email
3. Add scopes:
   - `openid`
   - `email`
   - `profile`
4. Add test users (for development)

## Step 4: Enable Google+ API (if needed)

1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" and enable it
3. Alternatively, use the newer "Google Identity Services"

## How It Works

1. User clicks the "Login" button
2. User is redirected to Google's OAuth consent screen
3. User grants permission and is redirected back to your app
4. The app exchanges the authorization code for an access token
5. The app uses the access token to fetch user information
6. User data (email, name, profile picture) is stored in the database
7. User is logged in and the header shows their profile

## User Data Stored

The following user information is extracted and stored:
- Email address
- Full name
- Profile picture URL
- Google ID (for identification)
- Creation timestamp
- Last login timestamp

## Security Features

- Tokens are stored securely in localStorage
- Session expiration is handled automatically
- User data is validated before storage
- OAuth state parameter prevents CSRF attacks

## Production Deployment

When deploying to production:
1. Update the redirect URI in Google Cloud Console
2. Update the `NEXT_PUBLIC_GOOGLE_REDIRECT_URI` environment variable
3. Ensure your domain is added to authorized domains in OAuth consent screen

## Troubleshooting

### Common Issues:

1. **Error: redirect_uri_mismatch**
   - Ensure the redirect URI in your environment matches the one configured in Google Cloud Console

2. **Error: invalid_client**
   - Check that your client ID and secret are correct

3. **Error: access_denied**
   - User denied permission or OAuth consent screen needs configuration

4. **Users not being saved to database**
   - Check the `/api/auth/user` endpoint is working
   - Verify the user data is being sent correctly

### Testing

1. Test the login flow in an incognito window
2. Check browser console for any JavaScript errors
3. Verify the OAuth callback URL is accessible
4. Test with different Google accounts 