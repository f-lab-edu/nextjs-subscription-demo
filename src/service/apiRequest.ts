interface ApiResponse<T> {
  data?: T;
  error?: string;
}

const API_BASE_URL = '/api';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.error || `HTTP Error: ${response.status}`,
      };
    }

    const result = await response.json();
    return result;
  } catch {
    return { error: '네트워크 오류가 발생했습니다.' };
  }
}
