import { FormData } from '../types/types';
export const transformToApiFormat = (formData: FormData): any => {
  return {
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
};
