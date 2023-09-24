// commercetools-api/applyPromoCode.ts

const applyPromoCode = async (
  cartId: string,
  version: number,
  promoCode: string
) => {
  const url: string = `https://api.${process.env.REACT_APP_REGION}.commercetools.com/${process.env.REACT_APP_PROJECT_KEY}/me/carts/${cartId}`;
  const bearerToken: string =
    localStorage.getItem('userAccessToken') ||
    localStorage.getItem('anonymousAccessToken') ||
    '';
  const body = {
    version,
    actions: [
      {
        action: 'addDiscountCode',
        code: promoCode,
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return await response.json();
  } else {
    // Handle any errors returned from the API
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};

export default applyPromoCode;
