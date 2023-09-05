export interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface User {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  authenticationMode: string;
  stores: any[]; // You can replace any with a more specific type if you know the structure
}

export interface AuthState {
  isLoggedIn: boolean;
  userData?: User;
}

export interface ICategory {
  id: string;
  name: {
    'en-US': string;
  };
  slug: {
    'en-US': string;
  };
  parent: {
    typeId: string;
    id: string;
  } | null;
}

export interface IProduct {
  id: string;
  categories: {
    id: string;
  }[];
  name: {
    'en-US': string;
  };
  slug: {
    'en-US': string;
  };
  prices: {
    value: {
      type: string;
      fractionDigits: number;
      centAmount: number;
      currencyCode: string;
    };
    id: string;
  }[];
  masterData: {
    current: {
      description: {
        'en-US': string;
      };
      masterVariant: {
        id: number;
        images: {
          dimensions: {
            h: number;
            w: number;
          };
          url: string;
        }[];
        prices: [
          {
            value: {
              centAmount: number;
            };
            discounted: {
              value: {
                centAmount: number;
              };
            };
          },
        ];
      };
      categories: [
        {
          id: string;
        },
      ];
      name: {
        'en-US': string;
      };
    };
  };
}
