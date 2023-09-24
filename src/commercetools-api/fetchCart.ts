import { getAccessToken } from './accessToken';
import { getCart } from './createCart';
import { getAnonymousAccessToken } from './getAnonymousAccessToken';

async function fetchCartByUserId(customerID: string = ''): Promise<any> {
  let cartURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/carts/customer-id=${customerID}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  if (!customerID || customerID === '') {
    let anonymousCartId = localStorage.getItem('anonymousCartId');
    let anonymouscartURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${anonymousCartId}`;

    if (!anonymousCartId) {
      console.log('no anonymousCartId');
      getCart();
      anonymousCartId = localStorage.getItem('anonymousCartId');
      anonymouscartURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${anonymousCartId}`;
    }
    return fetchCartById(anonymousCartId || '', anonymouscartURL);
  }

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

// fetch cart by id
export async function fetchCartById(cartId: string, url: string): Promise<any> {
  let anonymousAccessToken: string =
    localStorage.getItem('anonymousAccessToken') ||
    (await getAnonymousAccessToken());
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${anonymousAccessToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
