export const API_BASE_URL = '/api';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('auth_token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, { ...options, headers });

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!response.ok) {
        if (isJson) {
            const error = await response.json();
            throw new Error(error.error || `API request failed: ${response.status}`);
        } else {
            const text = await response.text();
            console.error('Non-JSON Error Response:', text);
            throw new Error(`API request failed with status ${response.status}. See console for details.`);
        }
    }

    if (isJson) {
        return response.json();
    } else {
        const text = await response.text();
        console.warn('Expected JSON response but received:', text);
        return text;
    }
};
