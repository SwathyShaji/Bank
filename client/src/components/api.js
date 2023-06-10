import axios from 'axios';

// Function to get account details
export const getAccountDetails = (token) => {
  return axios.get('/api/account-details', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Function to generate account statement
export const generateAccountStatement = (token) => {
  return axios.get('/api/statement', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Function to deposit amount
export const depositAmount = (amount, token) => {
  const data = { amount };
  return axios.post('/api/deposit', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
};
