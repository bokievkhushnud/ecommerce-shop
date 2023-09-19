import { getAccessToken } from './accessToken';
import { creds } from '../assets/credentials';

export async function loginUser(
  email: string,
  password: string
): Promise<void> {
  try {
    getUserAccessToken(email, password);
  } catch {}

  const loginURL: string = `https://api.${creds.region}.commercetools.com/${creds.projectKey}/login`;
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
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

async function getUserAccessToken(
  email: string,
  password: string
): Promise<string> {
  const loginURL: string = `https://auth.${creds.region}.commercetools.com/oauth/${creds.projectKey}/customers/token`;
  const credentials = btoa(`${creds.clientID}:${creds.clientSecret}`);
  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=password&username=${email}&password=${password}&scope=${creds.scopes}`,
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
