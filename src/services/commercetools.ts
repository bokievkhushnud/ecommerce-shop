export async function getAccessToken() {
  const authURL = `https://auth.${process.env.REACT_APP_REGION}.commercetools.com/oauth/token`;

  const base64Credentials = btoa(
    `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
  );

  const response = await fetch(authURL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&scope=${process.env.REACT_APP_AUTH_SCOPE}`,
  });

  if (!response.ok) {
    throw new Error('Failed to get an access token.');
  }

  const data = await response.json();
  return data.access_token;
}

export async function registerCustomer(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  accessToken: string
): Promise<any> {
  const registrationURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/customers`;

  return fetch(registrationURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Registration failed.');
      });
    }
    return response.json();
  });
}

export async function loginUser(
  email: string,
  password: string,
  accessToken: string
) {
  const loginURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/login`;

  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error('Login failed.');
  }

  const data = await response.json();
  return data;
}

export const isTokenExpired = (token: string): boolean => {
  const storedTime = localStorage.getItem('tokenStoredTime');
  if (!storedTime) return true;

  const isExpired = Date.now() - Number(storedTime) >= 3600000;
  return isExpired;
};
