import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://mint-frontend-test.onrender.com/api/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const token = request.headers.get('authorization');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = token;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('GET request failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const body = await request.json();
  const token = request.headers.get('authorization');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = token;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('POST request failed:', error);
    return NextResponse.json(
      { error: 'Failed to post data' },
      { status: 500 }
    );
  }
}