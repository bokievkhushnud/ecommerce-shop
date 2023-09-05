import { getAccessToken } from './accessToken';
import { Address } from '../types';
import { getUserFromStorage } from '../utils/auth';

export async function updateCustomerProfile(actions?: any): Promise<any> {
  const accessToken =
    localStorage.getItem('accessToken') || (await getAccessToken());

  const user = getUserFromStorage();
  const customerId = user?.id;
  const version = user?.version;

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

export async function addCustomerAddress(
  address: any,
  isBillingAddress: boolean = false,
  isDefaultBillingAddress: boolean = false,
  isShippingAddress: boolean = false,
  isDefaultShippingAddress: boolean = false
): Promise<any> {
  const actions = [
    {
      action: 'addAddress',
      address: address,
    },
  ];

  // The addressId is often provided in the response after adding the address.
  // For simplicity, let's assume that you'll get it from the API's response after adding the address
  const addedAddressResponse = await updateCustomerProfile(actions).then(
    (response) => {
      localStorage.setItem('user', JSON.stringify({ customer: response }));
      return response;
    }
  );

  const addressId =
    addedAddressResponse.addresses[addedAddressResponse.addresses.length - 1]
      .id;

  const furtherActions = [];

  if (isBillingAddress) {
    furtherActions.push({
      action: 'addBillingAddressId',
      addressId: addressId,
    });
  }

  if (isDefaultBillingAddress) {
    furtherActions.push({
      action: 'setDefaultBillingAddress',
      addressId: addressId,
    });
  }

  if (isShippingAddress) {
    furtherActions.push({
      action: 'addShippingAddressId',
      addressId: addressId,
    });
  }

  if (isDefaultShippingAddress) {
    furtherActions.push({
      action: 'setDefaultShippingAddress',
      addressId: addressId,
    });
  }

  if (furtherActions.length > 0) {
    return updateCustomerProfile(furtherActions);
  }

  return addedAddressResponse;
}

export async function updateCustomerAddress(
  addressId: string,
  updatedAddress: any,
  isBillingAddress: boolean = false,
  isDefaultBillingAddress: boolean = false,
  isShippingAddress: boolean = false,
  isDefaultShippingAddress: boolean = false
): Promise<any> {
  // Start with the primary action of updating the address
  const actions = [
    {
      action: 'changeAddress',
      addressId: addressId,
      address: updatedAddress,
    },
  ];

  // Preparing further actions based on updated address preferences
  const furtherActions = [];

  if (isBillingAddress) {
    furtherActions.push({
      action: 'addBillingAddressId',
      addressId: addressId,
    });
  } else {
    furtherActions.push({
      action: 'removeBillingAddressId',
      addressId: addressId,
    });
  }

  if (isDefaultBillingAddress) {
    furtherActions.push({
      action: 'setDefaultBillingAddress',
      addressId: addressId,
    });
  }

  if (isShippingAddress) {
    furtherActions.push({
      action: 'addShippingAddressId',
      addressId: addressId,
    });
  } else {
    furtherActions.push({
      action: 'removeShippingAddressId',
      addressId: addressId,
    });
  }

  if (isDefaultShippingAddress) {
    furtherActions.push({
      action: 'setDefaultShippingAddress',
      addressId: addressId,
    });
  }

  // Apply further actions if needed
  return updateCustomerProfile([...actions, ...furtherActions]);
}

export async function deleteCustomerAddress(addressId?: string): Promise<any> {
  const actions = [
    {
      action: 'removeAddress',
      addressId: addressId,
    },
  ];

  return updateCustomerProfile(actions);
}

interface CustomerChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function changeCustomerPassword(
  payload: CustomerChangePasswordPayload
): Promise<any> {
  // Replace these placeholders with actual values
  const user = getUserFromStorage();
  const customerId = user?.id;
  const version = user?.version;

  const API_ENDPOINT = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/customers/password`;
  const accessToken =
    localStorage.getItem('accessToken') || (await getAccessToken());
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      id: customerId,
      version,
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to change the password');
  }

  return response.json();
}
