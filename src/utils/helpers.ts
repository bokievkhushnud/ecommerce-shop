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
    // Default price (before any discount)
    const originalPrice = item.price.value.centAmount / 100;

    // Use discounted price if available, else fallback to original price
    const discountedPrice = item.discountedPrice
      ? item.discountedPrice.value.centAmount / 100
      : null;

    return {
      name: item.name['en-US'],
      imageUrl: item.variant.images[0].url,
      originalPrice: originalPrice,
      discountedPrice: discountedPrice,
      quantity: item.quantity,
      lineItemId: item.id,
    };
  });

  // Extract the total price and discount codes
  const totalPrice = rawCartData.totalPrice.centAmount / 100;
  const discountCodes = rawCartData.discountCodes.map(
    (dc: any) => dc.discountCode.id
  );

  return {
    lineItems,
    cartId: rawCartData.id,
    version: rawCartData.version,
    totalPrice,
    discountCodes,
  };
}
