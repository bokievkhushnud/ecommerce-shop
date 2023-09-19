import { getAccessToken } from './accessToken';
import { creds } from '../assets/credentials';

async function fetchCartByUserId(customerID: string): Promise<any> {
  const cartURL: string = `https://api.${creds.region}.commercetools.com/${creds.projectKey}/carts/customer-id=${customerID}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(cartURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export { fetchCartByUserId };
