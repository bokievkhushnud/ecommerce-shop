import { getAccessToken } from './accessToken';

async function fetchCartByUserId(customerID: string): Promise<any> {
  const cartURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/carts/customer-id=${customerID}`;
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
