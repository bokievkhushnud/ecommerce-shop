import { fetchCartByUserId } from './fetchCart';
import { getUserFromStorage } from '../utils/auth';

export async function updateCartItemQuantity(
  cartId: string,
  lineItemId: string,
  newQuantity: number
): Promise<any> {
  const updateURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${cartId}`;
  const bearerToken: string = localStorage.getItem('userAccessToken') || '';
  const userId = getUserFromStorage()?.id;
  let cart = await fetchCartByUserId(userId || '');
  const updateData = {
    version: cart.version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId: lineItemId,
        quantity: newQuantity,
      },
    ],
  };

  const response = await fetch(updateURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}


// function to remove item from cart
export async function removeCartItem(
  cartId: string,
  lineItemId: string

): Promise<any> {
  const updateURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${cartId}`;
  const bearerToken: string = localStorage.getItem('userAccessToken') || '';
  const userId = getUserFromStorage()?.id;
  let cart = await fetchCartByUserId(userId || '');
  const updateData = {
    version: cart.version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
      },
    ],
  };

  const response = await fetch(updateURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}


export async function addProductToCart(
  cartId: string,
  productId: string
): Promise<any> {
  const updateURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${cartId}`;
  const bearerToken: string = localStorage.getItem('userAccessToken') || '';
  const userId = getUserFromStorage()?.id;
  let cart = await fetchCartByUserId(userId || '');
  const updateData = {
    version: cart.version,
    actions: [
      {
        action: 'addLineItem',
        productId: productId,
      },
    ],
  };

  const response = await fetch(updateURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
