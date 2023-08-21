import { getAccessToken } from './access-token';

// interface AnonymousCart {
//     id: string;
//     typeId: string;
// }

export async function loginUser(
  email: string,
  password: string
  // anonymousCart: AnonymousCart
): Promise<void> {
  const loginURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/login`;
  const bearerToken: string = await getAccessToken();

  const response = await fetch(loginURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const responseData = await response.text();
    console.log(responseData);
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
