import * as React from 'react';

export default function RegistrationForm() {
    return (
        <div className="modal">
            <div className="modal--window">
                <div className="window--header">
                    <h3 className="window--header_heading">Sign Up</h3>
                    <p className="error-message"></p>
                </div>
                <form className="signUp-form">
                    <div className="full-name">
                        <input
                            type="text"
                            id="firstName"
                            className="input"
                            placeholder="First Name"
                        />
                        <input
                            type="text"
                            id="lastName"
                            className="input"
                            placeholder="Last Name"
                        />
                    </div>
                    <input
                        type="email"
                        id="e-mail"
                        className="inpute"
                        placeholder="E-mail"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Enter your email address"
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder="Password"
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                        title="Password must be at least 8 characters long and meet the specified requirements"
                        required
                    />
                    <button id="submitBtn" className="btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
