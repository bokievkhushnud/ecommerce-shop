import { getAccessToken } from './accessToken';
import { creds } from '../assets/credentials';

async function queryCategories(): Promise<any> {
  const loginURL: string = `https://api.${creds.region}.commercetools.com/${creds.projectKey}/categories`;
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
  const loginURL: string = `https://api.${creds.region}.commercetools.com/${creds.projectKey}/categories/${id}`;
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
