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
                    Authorization: `Bearer ${localStorage.getItem(
                        'access_token'
                    )}`,
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
        <div className="modal">
            <div className="modal--window">
                <div className="window--header">
                    <h3 className="window--header_heading">Sign Up</h3>
                </div>
                <form className="signUp-form" onSubmit={submitFormData}>
                    <div className="personal-info">
                        <div className="input-block">
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
                            <label htmlFor="firstName" className="label">
                                {errFirstName}
                            </label>
                        </div>
                        <div className="input-block">
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
                            <label htmlFor="lastName" className="label">
                                {errLastName}
                            </label>
                        </div>
                        <div className="input-block">
                            <input
                                type="date"
                                id="birthdate"
                                className="input"
                                name="birthdate"
                                required
                                value={formData.birthdate}
                                onChange={formFormData}
                            />
                            <label htmlFor="birthdate" className="label">
                                {errBirthdate}
                            </label>
                        </div>
                    </div>
                    <div className="address">
                        <div className="input-block">
                            <select onChange={selectFormData}>
                                <option disabled>Select Country...</option>
                                <option value="USA">USA</option>
                                <option value="other">Other...</option>
                            </select>
                            <label htmlFor="country" className="label">
                                {errCountry}
                            </label>
                        </div>
                        <div className="input-block">
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
                            <label htmlFor="city" className="label">
                                {errCity}
                            </label>
                        </div>
                        <div className="post-address">
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
                                <label htmlFor="postalCode" className="label">
                                    {errPostalCode}
                                </label>
                            </div>
                            <div className="input-block">
                                <input
                                    type="text"
                                    id="street"
                                    className="input"
                                    placeholder="Street, house number"
                                    name="street"
                                    required
                                    value={formData.street}
                                    onChange={formFormData}
                                />
                                <label htmlFor="street" className="label">
                                    {errStreet}
                                </label>
                            </div>
                        </div>
                    </div>
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
                    <label htmlFor="email" className="label">
                        {errEmail}
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
                    <label htmlFor="password" className="label">
                        {errPassword}
                    </label>
                    <IconButton onClick={showPassword}>{icon}</IconButton>
                    <button type="submit" id="submitBtn" className="btn">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
