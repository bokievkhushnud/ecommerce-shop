import { getAccessToken } from './accessToken';

export async function queryAllProducts(sortBy: string = ''): Promise<any> {
  let sortParam = '';

  if (sortBy) {
    switch (sortBy) {
      case 'Name':
        sortParam = `&sort=masterData.current.name.en-US asc`;
        break;
      case 'Price: Low to High':
        // Use a placeholder for now; further adjustment might be required based on the API's documentation
        sortParam = `&sort=variants.price.centAmount desc`;
        break;
      case 'Price: High to Low':
        // Use a placeholder for now; further adjustment might be required based on the API's documentation
        sortParam = `&sort=masterData.current.masterVariant.price desc`;
        break;
      default:
        break;
    }
  }

  const loginURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/products?limit=100${sortParam}`;
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
