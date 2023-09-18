const deleteCart = async (cartId: string, version: number): Promise<void> => {
  const bearerToken: string = localStorage.getItem('userAccessToken') || '';
  const deleteURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/carts/${cartId}?version=${version}`;

  const response = await fetch(deleteURL, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete the cart: ' + response.status);
  }
};

export { deleteCart };
