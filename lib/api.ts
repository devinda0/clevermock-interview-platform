const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Token refresh lock to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refresh the access token using the stored refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      // Refresh token is invalid or expired, clear tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      document.cookie = 'access_token=; path=/; max-age=0; SameSite=Strict';
      return null;
    }

    const data = await response.json();
    
    // Store the new tokens
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Strict`;
    
    return data.access_token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
}

/**
 * Get a valid access token, refreshing if necessary
 */
async function getValidAccessToken(): Promise<string | null> {
  const token = localStorage.getItem('access_token');
  
  // If no token, try to refresh
  if (!token) {
    if (isRefreshing && refreshPromise) {
      return refreshPromise;
    }
    
    isRefreshing = true;
    refreshPromise = refreshAccessToken();
    const newToken = await refreshPromise;
    isRefreshing = false;
    refreshPromise = null;
    return newToken;
  }
  
  return token;
}

/**
 * Make an authenticated fetch request with automatic token refresh
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
  retryOnAuthError = true
): Promise<Response> {
  const token = await getValidAccessToken();
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // If we get a 401 or 403, try to refresh the token and retry once
  if ((response.status === 401 || response.status === 403) && retryOnAuthError) {
    // Prevent multiple simultaneous refresh attempts
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken();
    }
    
    const newToken = await refreshPromise;
    isRefreshing = false;
    refreshPromise = null;
    
    if (newToken) {
      // Retry the request with the new token
      headers['Authorization'] = `Bearer ${newToken}`;
      return fetch(url, {
        ...options,
        headers,
      });
    }
  }
  
  return response;
}

// API Response Types
export interface PrepareStartResponse {
  conversation_id: string;
  status: string;
  interview_details: string;
}

export interface RefineResponse {
  interview_details: string;
}

export interface AcceptResponse {
  status: string;
}

// API Error type
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Start preparation - upload CV and initial details
 */
export async function startPreparation(
  file: File,
  position: string,
  instruction: string
): Promise<PrepareStartResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('position', position);
  formData.append('instruction', instruction);

  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/prepare/start`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, errorData.detail || 'Failed to start preparation');
  }

  return response.json();
}

/**
 * Refine interview details with user feedback
 */
export async function refineDetails(
  conversationId: string,
  message: string
): Promise<RefineResponse> {
  const formData = new FormData();
  formData.append('message', message);

  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/prepare/${conversationId}/refine`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, errorData.detail || 'Failed to refine details');
  }

  return response.json();
}

/**
 * Accept the interview details and proceed to interview
 */
export async function acceptDetails(conversationId: string): Promise<AcceptResponse> {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/prepare/${conversationId}/accept`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, errorData.detail || 'Failed to accept details');
  }

  return response.json();
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name?: string;
  is_active?: boolean;
}

export interface SignupResponse {
  email: string;
  full_name?: string;
  id: string;
  is_active: boolean;
  created_at: string;
}

/**
 * Register a new user
 */
export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      is_active: true
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, errorData.detail || 'Failed to sign up');
  }

  return response.json();
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

/**
 * Log in a user
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, errorData.detail || 'Failed to log in');
  }

  return response.json();
}

export interface LiveKitTokenResponse {
  token: string;
  identity: string;
  room: string;
  serverUrl: string;
}

/**
 * Get LiveKit token for interview room
 */
export async function getLiveKitToken(room: string): Promise<LiveKitTokenResponse> {
  console.log(room);
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/livekit/token?room=${room}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, errorData.detail || 'Failed to get interview token');
  }

  return response.json();
}
