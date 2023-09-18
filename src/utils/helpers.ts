import { FormData } from '../types/types';
export const transformToApiFormat = (
  formData: FormData,
  isDefaultShippingAddress: boolean,
  isDefaultBillingAddress: boolean,
  isAlsoBillingAddress: boolean
): any => {
  let userData: any = {
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dob,
    addresses: [
      {
        streetName: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
    ],
    shippingAddresses: [0],
  };

  if (isDefaultShippingAddress) {
    userData = {
      ...userData,
      defaultShippingAddress: 0,
    };
  }

  if (isAlsoBillingAddress && isDefaultBillingAddress) {
    userData = {
      ...userData,
      defaultBillingAddress: 0,
    };
  } else if (!isAlsoBillingAddress && isDefaultBillingAddress) {
    userData = {
      ...userData,
      defaultBillingAddress: 1,
    };
  }

  if (isAlsoBillingAddress) {
    userData = {
      ...userData,
      billingAddresses: [0],
    };
  } else {
    userData = {
      ...userData,
      addresses: [
        userData.addresses[0],
        {
          streetName: formData.billingStreet,
          city: formData.billingCity,
          postalCode: formData.billingPostalCode,
          country: formData.billingCountry,
        },
      ],

      billingAddresses: [1],
      shippingAddresses: [0],
    };
  }

  return userData;
};

export function adaptCartData(rawCartData: any) {
  if (!rawCartData || !rawCartData.lineItems) {
    return [];
  }
  const lineItems = rawCartData.lineItems.map((item: any) => {
    return {
      name: item.name['en-US'],
      imageUrl: item.variant.images[0].url,
      individualPrice: item.price.value.centAmount / 100,
      quantity: item.quantity,
      lineItemId: item.id,
    };
  });

  return {
    lineItems,
    cartId: rawCartData.id,
    version: rawCartData.version,
  };
}
