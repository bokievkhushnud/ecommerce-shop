import axios from 'axios';

const API_ENDPOINT = 'YOUR_COMMERCETOOLS_API_ENDPOINT';
const PROJECT_KEY = 'YOUR_PROJECT_KEY';
const AUTH_TOKEN = 'YOUR_AUTH_TOKEN'; // This can be fetched dynamically

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${API_ENDPOINT}/${PROJECT_KEY}/customers`,
    {
      email: userData.email,
      password: userData.password,
      // Add more fields if required
    },
    {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
