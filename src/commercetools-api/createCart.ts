// api to create a cart
import { getUserFromStorage } from '../utils/auth';
import { fetchCartByUserId } from './fetchCart';
import { creds } from '../assets/credentials';

async function createCart(): Promise<any> {
  const createCartURL: string = `https://api.${creds.region}.commercetools.com/${creds.projectKey}/me/carts`;
  const bearerToken: string = localStorage.getItem('userAccessToken') || '';
  const userId = getUserFromStorage()?.id;
  const cartData = {
    currency: 'USD',
  };

  const response = await fetch(createCartURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartData),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

// fucntion first checks if there is active cart for this user, if not it creates one

export async function getCart(): Promise<any> {
  const userId = getUserFromStorage()?.id;
  try {
    let cart = await fetchCartByUserId(userId || '');
    return cart;
  } catch (error) {
    console.log(error);
    let cart = await createCart();
    return cart;
  }
}
