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
        await fetch(
            'https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials'
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
    function checkOnValidation(
        name: keyof Types.FormData | string,
        value: string
    ): void {
        let errorMessage = '';

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            // errorMessage = 'Invalid email address';
            errors.email = 'Invalid email address';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(formData.password)) {
            // errorMessage = 'Invalid password format';
            errors.password = 'Invalid password format';
        }
        if (!/^[A-Za-z]+$/.test(formData.firstName)) {
            // errorMessage = 'Invalid first name';
            errors.firstName = 'Invalid first name';
        }
        if (!/^[A-Za-z]+$/.test(formData.lastName)) {
            // errorMessage = 'Invalid last name';
            errors.lastName = 'Invalid last name';
        }
        const dob = new Date(formData.birthdate);
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
        if (dob >= thirteenYearsAgo) {
            // errorMessage = 'You must be at least 13 years old';
            errors.birthdate = 'You must be at least 13 years old';
        }
        if (formData.street.trim() === '') {
            // errorMessage = 'Street is required';
            errors.street = 'Street is required';
        }
        if (!/^[A-Za-z\s]+$/.test(formData.city)) {
            // errorMessage = 'Invalid city name';
            errors.city = 'Invalid city name';
        }
        if (!/^[A-Za-z0-9\s]+$/.test(formData.postalCode)) {
            // errorMessage = 'Invalid postal code';
            errors.postalCode = 'Invalid postal code';
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
        console.log(errors);
    }
    function showPassword(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        if (type === 'password') {
            setType('text');
            setIcon(<VisibilityOffSharp />);
        } else {
            setType('password');
            setIcon(<RemoveRedEyeSharp />);
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
                                {errors.firstName}
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
                                {errors.lastName}
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
                                {errors.birthdate}
                            </label>
                        </div>
                    </div>
                    <div className="address">
                        <div className="input-block">
                            <input
                                type="text"
                                id="country"
                                className="input"
                                placeholder="Country"
                                name="country"
                                required
                                value={formData.country}
                                onChange={formFormData}
                            />
                            <label htmlFor="country" className="label">
                                {errors.country}
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
                                {errors.city}
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
                                    {errors.postalCode}
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
                                    {errors.street}
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
                        {errors.email}
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
                        {errors.password}
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
