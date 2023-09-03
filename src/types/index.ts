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

export interface ProductProps {
  title: string;
  image: string;
  description: string;
  price: number;
}
