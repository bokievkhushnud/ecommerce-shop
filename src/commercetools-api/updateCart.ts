import { fetchCartByUserId } from './fetchCart';
import { getUserFromStorage } from '../utils/auth';
import { creds } from '../assets/credentials';

export async function updateCartItemQuantity(
  cartId: string,
  lineItemId: string,
  newQuantity: number
): Promise<any> {
  const updateURL: string = `https://api.${creds.region}.commercetools.com/${creds.projectKey}/me/carts/${cartId}`;
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
