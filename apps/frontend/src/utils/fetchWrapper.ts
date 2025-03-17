
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
  withCredentials?: boolean;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson && data.message ? data.message : 'An error occurred';
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

const fetchWrapper = {
  /**
   * Performs a GET request
   * @param url - The endpoint URL (will be appended to base URL)
   * @param options - Additional fetch options
   */
  get: async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    const { params, ...fetchOptions } = options;

    let queryUrl = url;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        queryUrl = `${url}?${queryString}`;
      }
    }

    const response = await fetch(`${API_BASE_URL}${queryUrl}`, {
      method: 'GET',
      credentials: options.withCredentials ? 'include' : 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...fetchOptions,
    });

    return handleResponse<T>(response);
  },

  /**
   * Performs a POST request
   * @param url - The endpoint URL (will be appended to base URL)
   * @param body - The request body (will be JSON stringified)
   * @param options - Additional fetch options
   */
  post: async <T>(url: string, body: any = {}, options: FetchOptions = {}): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      credentials: options.withCredentials ? 'include' : 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    return handleResponse<T>(response);
  },

  /**
   * Performs a PUT request
   * @param url - The endpoint URL (will be appended to base URL)
   * @param body - The request body (will be JSON stringified)
   * @param options - Additional fetch options
   */
  put: async <T>(url: string, body: any = {}, options: FetchOptions = {}): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      credentials: options.withCredentials ? 'include' : 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    return handleResponse<T>(response);
  },

  /**
   * Performs a DELETE request
   * @param url - The endpoint URL (will be appended to base URL)
   * @param options - Additional fetch options
   */
  delete: async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      credentials: options.withCredentials ? 'include' : 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    return handleResponse<T>(response);
  }
};

export default fetchWrapper;