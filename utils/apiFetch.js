function buildQueryString(params = {}) {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
}

export async function apiFetch(url, { method = 'GET', body = null, headers = {}, params = {} } = {}) {
  const queryString = buildQueryString(params);
  const fetchUrl = `${url}${queryString}`;

  const options = {
    method,
    headers: {
      ...headers,
    },
  };

  const methodsAllowingBody = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (body && methodsAllowingBody.includes(method)) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(fetchUrl, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
  }

  return await res.json();
}
