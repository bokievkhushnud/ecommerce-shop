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
                    />
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder="Password"
                    />
                    <button id="submitBtn" className="btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
