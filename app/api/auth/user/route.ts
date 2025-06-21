import { NextRequest, NextResponse } from 'next/server';

// Store only the current user session
// In production, replace this with your actual database
let currentUser: {
  id: string;
  email: string;
  name: string;
  picture: string;
  googleId: string;
  loginTime: Date;
} | null = null;

export async function POST(request: NextRequest) {
  try {
    const { email, name, picture, googleId } = await request.json();

    if (!email || !name || !googleId) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, googleId' },
        { status: 400 }
      );
    }

    // Store/update the current user
    currentUser = {
      id: Math.random().toString(36).substr(2, 9), // Simple ID generation
      email,
      name,
      picture,
      googleId,
      loginTime: new Date(),
    };
    
    return NextResponse.json({
      message: 'User login processed successfully',
      user: currentUser,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing user login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return current user information
    return NextResponse.json({
      currentUser,
      isLoggedIn: !!currentUser,
      loginTime: currentUser?.loginTime
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Add a logout endpoint to clear current user
export async function DELETE(request: NextRequest) {
  try {
    currentUser = null;
    return NextResponse.json({
      message: 'User logged out successfully'
    });
  } catch (error) {
    console.error('Error logging out user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 