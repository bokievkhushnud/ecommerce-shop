import { getAccessToken } from './accessToken';

export async function loginUser(
  email: string,
  password: string
): Promise<void> {
  try {
    getUserAccessToken(email, password);
  } catch {}

  const loginURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/login`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    try {
      localStorage.removeItem('anonymousCartId');
      localStorage.removeItem('anonymousAccessToken');
      localStorage.removeItem('anonymousRefreshToken');
    } catch {}
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export async function getUserAccessToken(
  email: string,
  password: string
): Promise<string> {
  const loginURL: string = `https://auth.${process.env.REACT_APP_REGION}.commercetools.com/oauth/${process.env.REACT_APP_PROJECT_KEY}/customers/token`;
  const credentials = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );
  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=password&username=${email}&password=${password}&scope=${process.env.REACT_APP_SCOPES}`,
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('userAccessToken', data.access_token);
    localStorage.setItem('userRefreshToken', data.refresh_token);
    return data.access_token;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
