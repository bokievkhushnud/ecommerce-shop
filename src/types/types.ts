export type FormErrors = {
    [key: string]: string;
};

export type FormData = {
    firstName: string;
    lastName: string;
    birthdate: string;
    country: string;
    city: string;
    postalCode: string;
    street: string;
    house: string;
    apartment: string;
    email: string;
    password: string;
};

export type httpBody = {
    method: string;
    headers: Headers;
    body: string;
};
