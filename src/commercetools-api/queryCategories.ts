import { getAccessToken } from './accessToken';

async function queryCategories(): Promise<any> {
  const loginURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/categories`;
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

async function getCategoryByID(id: string): Promise<any> {
  const loginURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/categories/${id}`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(loginURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP Error: ' + response.status);
  }
}

export { queryCategories, getCategoryByID };
