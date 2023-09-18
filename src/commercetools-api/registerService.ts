import { getAccessToken } from './accessToken';
import { FormData } from '../types/types';
import { transformToApiFormat } from '../utils/helpers';

export async function registerCustomer(
  formData: FormData,
  isDefaultShippingAddress: boolean,
  isDefaultBillingAddress: boolean,
  isAlsoBillingAddress: boolean
): Promise<any> {
  const accessToken =
    localStorage.getItem('accessToken') || (await getAccessToken());
  const registrationURL = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/customers`;

  return fetch(registrationURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      transformToApiFormat(
        formData,
        isDefaultShippingAddress,
        isDefaultBillingAddress,
        isAlsoBillingAddress
      )
    ),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Registration failed.');
      });
    }
    return response.json();
  });
}
