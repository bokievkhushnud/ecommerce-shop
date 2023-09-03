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

export interface ProductProps {
  title: string;
  image: string;
  description: string;
  price: number;
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
