import * as React from 'react';
import { useState } from 'react';
import { RemoveRedEyeSharp, VisibilityOffSharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as Types from '../types/types';

export default function RegistrationForm() {
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
        terms: 'false',
    });
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<VisibilityOffSharp />);
    const [errors, setErrors] = useState<Types.FormErrors>({});

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

        switch (name) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = 'Invalid email address';
                }
                break;
            case 'password':
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(value)) {
                    errorMessage = 'Invalid password format';
                }
                break;
            case 'firstName':
                if (!/^[A-Za-z]+$/.test(value)) {
                    errorMessage = 'Invalid first name';
                }
                break;
            default:
                break;
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
    function getToken() {
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
        fetch(
            'https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials',
            requestOptions
        )
            .then((response) => response.json())
            .then((result) =>
                localStorage.setItem('access_token', result.access_token)
            )
            .catch((error) => console.log('error', error));
    }
    getToken();
    function submitFormData(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        Object.entries(formData).forEach((pair) => {
            checkOnValidation(pair[0], pair[1]);
        });
        const hasErrors = Object.values(errors).some((error) => error !== '');
        if (!hasErrors) {
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
                        <input
                            type="date"
                            id="birthdate"
                            className="input"
                            name="birthdate"
                            required
                            value={formData.birthdate}
                            onChange={formFormData}
                        />
                    </div>
                    <div className="address">
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
                        <div className="post-address">
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
                        </div>
                    </div>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        placeholder="E-mail"
                        name="email"
                        title="Enter your email address"
                        required
                        value={formData.email}
                        onChange={formFormData}
                    />
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
                    <IconButton onClick={showPassword}>{icon}</IconButton>
                    <button type="submit" id="submitBtn" className="btn">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
