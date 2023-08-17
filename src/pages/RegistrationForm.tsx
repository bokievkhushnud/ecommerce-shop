import * as React from 'react';
import { useState } from 'react';

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        terms: false,
    });
    function formFormData(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevFormData) => {
            const { name, value, type, checked } = event.target;
            return {
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value,
            };
        });
    }
    function submitFormData(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(formData);
    }
    return (
        <div className="modal">
            <div className="modal--window">
                <div className="window--header">
                    <h3 className="window--header_heading">Sign Up</h3>
                </div>
                <form className="signUp-form" onSubmit={submitFormData}>
                    <div className="full-name">
                        <input
                            type="text"
                            id="firstName"
                            className="input"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={formFormData}
                        />
                        <input
                            type="text"
                            id="lastName"
                            className="input"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={formFormData}
                        />
                    </div>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        placeholder="E-mail"
                        name="email"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Enter your email address"
                        required
                        value={formData.email}
                        onChange={formFormData}
                    />
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder="Password"
                        name="password"
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                        title="Password must be at least 8 characters long and meet the specified requirements"
                        required
                        value={formData.password}
                        onChange={formFormData}
                    />
                    <button id="submitBtn" className="btn">
                        Register
                    </button>
                    <input
                        type="checkbox"
                        name="terms"
                        className="checkbox"
                        id="termsCheckbox"
                        required
                        onChange={formFormData}
                        checked={formData.terms}
                    />
                    <label htmlFor="termsCheckbox" className="checkbox-label">
                        Do you agree with the&nbsp;
                        <a href="https://ecommerceguide.com/guides/ecommerce-terms-conditions/">
                            Terms of Use
                        </a>
                        ?
                    </label>
                </form>
            </div>
        </div>
    );
}
