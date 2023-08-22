import * as React from 'react';
import { useState } from 'react';
import { RemoveRedEyeSharp, VisibilityOffSharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as Types from '../types/types';

export default function RegistrationForm() {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<VisibilityOffSharp />);
  const [errors, setErrors] = useState<Types.FormData>({
    firstName: '',
    lastName: '',
    birthdate: '',
    country: '',
    city: '',
    postalCode: '',
    street: '',
    house: '',
    apartment: '',
    email: '',
    password: '',
  });

  const [formData, setFormData] = useState<Types.FormData>({
    firstName: '',
    lastName: '',
    birthdate: '',
    country: '',
    city: '',
    postalCode: '',
    street: '',
    house: '',
    apartment: '',
    email: '',
    password: '',
  });

  async function getToken() {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Basic UUZScUV1RnQ1NDVjWloyQXREcXE3Y1ZaOnhZcnBoSVVHVWM3b08ydlNDTGNMM1AtQ2kyOGhnU3o4'
    );
    const requestOptions: Types.httpBody = {
      method: 'POST',
      headers: myHeaders,
      body: '',
    };
    await fetch(
      'https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem('access_token', result.access_token);
      })
      .catch((error) => console.log('error', error));
  }
  getToken();

  function formFormData(event: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prevFormData) => {
      const { name, value, type, checked } = event.target;
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }
  function selectFormData(event: React.ChangeEvent<HTMLSelectElement>): void {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        country: event.target.value,
      };
    });
  }

  const [errFirstName, setErrFirstName] = useState('');
  const [errLastName, setErrLastName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errBirthdate, setErrBirthdate] = useState('');
  const [errStreet, setErrStreet] = useState('');
  const [errHouse, setErrHouse] = useState('');
  const [errApartment, setErrApartment] = useState('');
  const [errCity, setErrCity] = useState('');
  const [errPostalCode, setErrPostalCode] = useState('');
  const [errCountry, setErrCountry] = useState('');

  function checkOnValidation(
    name: keyof Types.FormData | string,
    value: string
  ): void {
    let errorMessage = '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrEmail('Invalid email address');
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(formData.password)) {
      setErrPassword('Invalid password format');
    }
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      setErrFirstName('Invalid first name');
    }
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      setErrLastName('Invalid last name');
    }
    const dob = new Date(formData.birthdate);
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
    if (dob >= thirteenYearsAgo) {
      setErrBirthdate('You must be at least 13 years old');
    }
    if (formData.street.trim() === '') {
      setErrStreet('Street is required');
    }
    if (!/^[0-9\s]+$/.test(formData.postalCode)) {
      setErrPostalCode('Postal Code is required');
    }
    if (!/^[0-9\s]+$/.test(formData.house)) {
      setErrHouse('House is required');
    }
    if (
      !/^[0-9\s]+$/.test(formData.apartment) ||
      formData.apartment.trim() === ''
    ) {
      setErrApartment('Enter number of apartment');
    }
    if (!/^[A-Za-z\s]+$/.test(formData.city)) {
      setErrCity('Invalid city name');
    }
    if (!/^[0-9\s]+$/.test(formData.postalCode)) {
      setErrPostalCode('Invalid postal code');
    }
    if (formData.country.trim() === '') {
      setErrCountry('Choose a country');
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  }
  function showPassword(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (type === 'password') {
      setType('text');
      setIcon(<RemoveRedEyeSharp />);
    } else {
      setType('password');
      setIcon(<VisibilityOffSharp />);
    }
  }
  async function submitFormData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    Object.entries(formData).forEach((pair) => {
      checkOnValidation(pair[0], pair[1]);
    });
    const hasErrors = Object.values(errors).some((error) => error !== '');

    if (!hasErrors) {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      fetch(
        'https://api.us-central1.gcp.commercetools.com/ecommerceproject-finaltask/customers',
        options
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="signUp">
      <div className="signUp--window">
        <div className="signUp--header">
          <h3 className="signUp--header_heading">Sign Up</h3>
        </div>
        <form className="signUp-form" onSubmit={submitFormData} noValidate>
          <div className="personal-info">
            <h3 className="form-heading">Personal Info</h3>
            <div className="input-block">
              <label htmlFor="firstName" className="label">
                Name
              </label>
              <input
                type="text"
                id="firstName"
                className="input"
                placeholder="First Name"
                name="firstName"
                required
                value={formData.firstName}
                onChange={formFormData}
              />
              <p className="error-message">{errFirstName}</p>
            </div>
            <div className="input-block">
              <label htmlFor="lastName" className="label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="input"
                placeholder="Last Name"
                name="lastName"
                required
                value={formData.lastName}
                onChange={formFormData}
              />
              <p className="error-message">{errLastName}</p>
            </div>
            <div className="input-block">
              <label htmlFor="birthdate" className="label">
                Date of Birth
              </label>
              <input
                type="date"
                id="birthdate"
                className="input"
                name="birthdate"
                required
                value={formData.birthdate}
                onChange={formFormData}
              />
              <p className="error-message">{errBirthdate}</p>
            </div>
          </div>
          <div className="shipping">
            <h3 className="address-info">Shipping Address</h3>
            <div className="address-settings">
              <label htmlFor="defaultAddress" className="label-default">
                Set as default address
              </label>
              <input type="checkbox" id="defaultAddress" />
              <label htmlFor="isBilling" className="label-default">
                Use as billing address
              </label>
              <input type="checkbox" id="isBilling" />
            </div>
            <div className="input-block">
              <label htmlFor="country" className="label">
                Country
              </label>
              <select id="country" onChange={selectFormData}>
                <option disabled>Select Country...</option>
                <option value="USA">USA</option>
                <option value="other">Other...</option>
              </select>
              <p className="error-message">{errCountry}</p>
            </div>
            <div className="input-block">
              <label htmlFor="city" className="label">
                City
              </label>
              <input
                type="text"
                id="city"
                className="input"
                placeholder="City"
                name="city"
                required
                value={formData.city}
                onChange={formFormData}
              />
              <p className="error-message">{errCity}</p>
            </div>
            <div className="post-address">
              <label htmlFor="postalCode" className="label">
                Postal Code
              </label>
              <div className="input-block">
                <input
                  type="text"
                  id="postalCode"
                  className="input"
                  placeholder="Postal Code"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={formFormData}
                />
                <p className="error-message">{errPostalCode}</p>
              </div>
              <div className="input-block">
                <label htmlFor="street" className="label">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  className="input"
                  placeholder="Street"
                  name="street"
                  required
                  value={formData.street}
                  onChange={formFormData}
                />
                <p className="error-message">{errStreet}</p>
                <label htmlFor="house" className="label">
                  House
                </label>
                <input
                  type="text"
                  id="house"
                  className="input"
                  placeholder="House"
                  name="house"
                  required
                  value={formData.street}
                  onChange={formFormData}
                />
                <p className="error-message">{errHouse}</p>
                <label htmlFor="apartment" className="label">
                  Apartment
                </label>
                <input
                  type="text"
                  id="apartment"
                  className="input"
                  placeholder="Apartment"
                  name="apartment"
                  value={formData.street}
                  onChange={formFormData}
                />
                <p className="error-message">{errApartment}</p>
              </div>
            </div>
          </div>
          <div className="billing">
            <h3 className="address-info">Billing Address</h3>
            <div className="address-settings">
              <label htmlFor="defaultAddress" className="label-default">
                Set as default address
              </label>
              <input type="checkbox" id="defaultAddress" />
            </div>
            <div className="input-block">
              <label htmlFor="country" className="label">
                Country
              </label>
              <select id="country" onChange={selectFormData}>
                <option disabled>Select Country...</option>
                <option value="USA">USA</option>
                <option value="other">Other...</option>
              </select>
              <p className="error-message">{errCountry}</p>
            </div>
            <div className="input-block">
              <label htmlFor="city" className="label">
                City
              </label>
              <input
                type="text"
                id="city"
                className="input"
                placeholder="City"
                name="city"
                required
                value={formData.city}
                onChange={formFormData}
              />
              <p className="error-message">{errCity}</p>
            </div>
            <div className="post-address">
              <label htmlFor="postalCode" className="label">
                Postal Code
              </label>
              <div className="input-block">
                <input
                  type="text"
                  id="postalCode"
                  className="input"
                  placeholder="Postal Code"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={formFormData}
                />
                <p className="error-message">{errPostalCode}</p>
              </div>
              <div className="input-block">
                <label htmlFor="street" className="label">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  className="input"
                  placeholder="Street"
                  name="street"
                  required
                  value={formData.street}
                  onChange={formFormData}
                />
                <p className="error-message">{errStreet}</p>
                <label htmlFor="house" className="label">
                  House
                </label>
                <input
                  type="text"
                  id="house"
                  className="input"
                  placeholder="House"
                  name="house"
                  required
                  value={formData.street}
                  onChange={formFormData}
                />
                <p className="error-message">{errHouse}</p>
                <label htmlFor="apartment" className="label">
                  Apartment
                </label>
                <input
                  type="text"
                  id="apartment"
                  className="input"
                  placeholder="Apartment"
                  name="apartment"
                  value={formData.street}
                  onChange={formFormData}
                />
                <p className="error-message">{errApartment}</p>
              </div>
            </div>
          </div>
          <div className="credentials">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="input"
              placeholder="E-mail"
              name="email"
              title="Enter your email address"
              required
              value={formData.email}
              onChange={formFormData}
            />
            <p className="error-message">{errEmail}</p>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type={type}
              id="password"
              className="input"
              placeholder="Password"
              name="password"
              title="Password must be at least 8 characters long and meet the specified requirements"
              required
              value={formData.password}
              onChange={formFormData}
            />
            <p className="error-message">{errPassword}</p>
          </div>
          <IconButton onClick={showPassword}>{icon}</IconButton>
          <button type="submit" id="submitBtn" className="btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
