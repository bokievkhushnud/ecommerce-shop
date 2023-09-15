export type FormData = {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  billingCountry: string;
  billingCity?: string;
  billingStreet?: string;
  billingPostalCode?: string;
};

export type FormErrors = {
  [K in keyof FormData]?: string;
};

export type ImagesURL = {
  url: string;
  label: string;
  dimensions: { w: number; h: string };
};

export type TeammateData = {
  name: string;
  role: string;
  intro: string;
  photo: string;
  github: string;
  constributions: string[];
};
