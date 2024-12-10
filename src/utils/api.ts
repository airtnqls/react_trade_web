import { handleApiError } from './errorHandling';

const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

export async function postApi<T>(endpoint: string, data: any): Promise<T | null> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function putApi<T>(endpoint: string, data: any): Promise<T | null> {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}