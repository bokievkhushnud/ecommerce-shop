export async function getAccessToken(): Promise<string> {
  const authURL = `https://auth.${process.env.REACT_APP_REGION}.commercetools.com/oauth/token`;
  const credentials = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );

  const response = await fetch(authURL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&scope=${process.env.REACT_APP_SCOPE}`,
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
