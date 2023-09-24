// api to create a cart
import { getUserFromStorage } from '../utils/auth';
import { fetchCartByUserId } from './fetchCart';
import { getAnonymousAccessToken } from './getAnonymousAccessToken';

async function createCart(bearerToken: string): Promise<any> {
  const createCartURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts`;
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
  if (!userId) {
    if (!localStorage.getItem('anonymousCartId')) {
      let anonymousAccessToken: string =
        localStorage.getItem('anonymousAccessToken') ||
        (await getAnonymousAccessToken());
      let cart = await createCart(anonymousAccessToken);
      localStorage.setItem('anonymousCartId', cart.id);
      return cart;
    } else {
      try {
        let cart = await fetchCartByUserId();
        return cart;
      } catch (error) {
        let anonymousAccessToken: string =
          localStorage.getItem('anonymousAccessToken') ||
          (await getAnonymousAccessToken());
        let cart = await createCart(anonymousAccessToken);
        localStorage.setItem('anonymousCartId', cart.id);
        return cart;
      }
    }
  }
  try {
    let cart = await fetchCartByUserId(userId || '');
    return cart;
  } catch (error) {
    const bearerToken: string = localStorage.getItem('userAccessToken') || '';
    let cart = await createCart(bearerToken);
    return cart;
  }
}
