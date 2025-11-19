import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await User.create({ email: email.toLowerCase() });

    // Send confirmation email
    try {
      await sendConfirmationEmail(newUser.email);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Continue execution, don't fail the request just because email failed
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined the waitlist!',
        data: { email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Waitlist API Error:', error);

    // Handle duplicate key error (in case of race condition)
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return NextResponse.json(
        { success: false, message: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
