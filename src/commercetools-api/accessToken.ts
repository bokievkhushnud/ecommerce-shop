import { creds } from '../assets/credentials';
export async function getAccessToken(): Promise<string> {
  const authURL = `https://auth.${creds.region}.commercetools.com/oauth/token`;
  const credentials = btoa(`${creds.clientID}:${creds.clientSecret}`);

  const response = await fetch(authURL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&scope=${creds.scopes}`,
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    return data.access_token;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
