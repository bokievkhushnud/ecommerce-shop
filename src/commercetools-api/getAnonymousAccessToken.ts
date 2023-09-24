export async function getAnonymousAccessToken(): Promise<string> {
  const loginURL: string = `https://auth.${process.env.REACT_APP_REGION}.commercetools.com/oauth/${process.env.REACT_APP_PROJECT_KEY}/anonymous/token`;
  const credentials = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );
  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&scope=${process.env.REACT_APP_SCOPES}`,
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('anonymousAccessToken', data.access_token);
    localStorage.setItem('anonymousRefreshToken', data.refresh_token);
    return data.access_token;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
