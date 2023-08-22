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
  };

  if (isDefaultShippingAddress) {
    userData = {
      ...userData,
      defaultShippingAddress: 0,
    };
  }

  if (isDefaultBillingAddress) {
    userData = {
      ...userData,
      defaultBillingAddress: 0,
    };
  }

  if (isAlsoBillingAddress) {
    userData = {
      ...userData,
      billingAddresses: [0],
      shippingAddresses: [0],
    };
  } else {
    userData = {
      ...userData,
      addresses: [
        {
          streetName: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
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