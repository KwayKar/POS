const BASE_URL = 'https://example.com/api';

async function apiClient(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  };

  if (fetchOptions.body && typeof fetchOptions.body !== 'string') {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const error = new Error('Network response was not ok');
    error.response = response;
    throw error;
  }

  return response.json();
}

export const signUp = async (formData) => {
  return await apiClient.post('/auth/signup', formData);
};

export const login = async (formData) => {
  return await apiClient.post('/auth/login', formData);
};
