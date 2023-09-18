// validators for forms
export const validateEmail = (email: string): string =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format';

export const validatePassword = (password: string): string =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
    password
  )
    ? ''
    : 'Password should be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 symbol';

export const validateName = (name: string): string =>
  /^[A-Za-z]+$/.test(name) ? '' : 'Only alphabets allowed and cannot be empty';

export const validateDOB = (dob: string): string => {
  const ageDiff = Date.now() - new Date(dob).getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970) < 13
    ? 'You must be 13 years or older'
    : '';
};
export const validateStreet = (street: string): string => {
  return street.trim() === '' ? 'Street cannot be empty' : '';
};

export const validateCity = (city: string): string => {
  return /^[a-zA-Z\s]+$/.test(city) ? '' : 'Invalid city name';
};

export const validatePostalCodeForCountry = (
  postalCode: string,
  country: string
): string => {
  if (country === 'US' && !/^\d{5}$/.test(postalCode)) {
    return 'Invalid US postal code format (e.g. 12345)';
  }
  if (
    country === 'CA' &&
    !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)
  ) {
    return 'Invalid Canada postal code format (e.g. A1B 2C3)';
  }
  return '';
};
