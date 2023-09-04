export interface User {
  addresses: any[];
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: string;
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
        en: string;
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
