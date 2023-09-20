import { getAccessToken } from './accessToken';

async function fetchPromoCodes(): Promise<any> {
  const promoCodesURL: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/discount-codes`;
  const bearerToken: string =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const response = await fetch(promoCodesURL, {
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

export { fetchPromoCodes };
