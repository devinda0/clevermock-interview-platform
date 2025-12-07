const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}/api/v1/prepare/start`, {
    method: 'POST',
    headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
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

  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}/api/v1/prepare/${conversationId}/refine`, {
    method: 'POST',
    headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
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
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}/api/v1/prepare/${conversationId}/accept`, {
    method: 'POST',
    headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
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
