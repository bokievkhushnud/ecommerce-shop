import { getAccessToken } from './accessToken';

export async function queryAllProducts(): Promise<any> {
  const loginURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/products?limit=100`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(loginURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.results;
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export async function getProductByID(productId: string): Promise<any> {
  const productURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/products/${productId}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(productURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data; // since it's a single product, we directly return the data without using data.results
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}
