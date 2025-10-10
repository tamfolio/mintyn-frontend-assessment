// Base API configuration - Use proxy to avoid CORS issues
const API_BASE_URL = '/api/proxy';
const TOKEN_KEY = 'spring_access_token';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  // Check if the response is not ok OR if there's an error in the data
  if (!response.ok || data.error) {
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }
    
    throw new ApiError(
      response.status, 
      data.error || data.message || response.statusText
    );
  }
  
  return data;
}

// Token management functions
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// Generic fetch function with auth
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(response);
}

// Login function
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
  };
  message: string;
  error: null | string;
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

// Logout function
export function logout(): void {
  removeToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

// GET request helper
export async function fetchData<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
  });
}