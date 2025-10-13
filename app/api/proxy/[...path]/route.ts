import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE_URL = 'https://mint-frontend-test.onrender.com/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Login failed', details: String(error) },
      { status: 500 }
    );
  }
}