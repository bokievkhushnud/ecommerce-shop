import { getAccessToken } from './accessToken';

export async function updateCustomerProfile(
  customerId?: string,
  version?: number,
  actions?: any
): Promise<any> {
  const accessToken =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const updateURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/customers/${customerId}`;

  return fetch(updateURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ version, actions }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Update failed.');
      });
    }
    return response.json();
  });
}
