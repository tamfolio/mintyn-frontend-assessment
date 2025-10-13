import { NextResponse, NextRequest } from 'next/server';

const API_BASE_URL = 'https://mint-frontend-test.onrender.com/api/v1';

// Explicitly tell Next.js which methods are supported
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Define supported methods
export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE');
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, 'PATCH');
}

async function handleRequest(request: NextRequest, method: string) {
  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/proxy/', '');
    
    console.log(`${method} request to: ${path}`);
    
    const authHeader = request.headers.get('authorization');
    const contentType = request.headers.get('content-type');

    const headers: HeadersInit = {
      'Content-Type': contentType || 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    let body: string | undefined;
    if (method !== 'GET' && method !== 'DELETE') {
      body = await request.text();
    }

    const response = await fetch(`${API_BASE_URL}/${path}`, {
      method,
      headers,
      body,
    });

    const responseText = await response.text();
    
    return new NextResponse(responseText, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`${method} Error:`, error);
    return NextResponse.json(
      { error: 'Request failed', details: String(error) },
      { status: 500 }
    );
  }
}