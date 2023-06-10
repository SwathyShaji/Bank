import React, { useState, useEffect } from 'react';
import { getAccountDetails, generateAccountStatement, depositAmount } from '../api';

export const HomePage = ({ token }) => {
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = () => {
    getAccountDetails(token)
      .then(response => {
        const { accountNumber, balance } = response.data;
        setAccountDetails({ accountNumber, balance });
      })
      .catch(error => {
        console.error(error);
      });
  };
  

  const handleDeposit = () => {
    const amount = 100; // Replace with the actual amount to be deposited
    depositAmount(amount, token)
      .then(response => {
        console.log(response.data);
        fetchAccountDetails(); // Refresh account details after successful deposit
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGenerateStatement = () => {
    generateAccountStatement(token)
      .then(response => {
        console.log(response.data.statement);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>Account Details:</p>
      {accountDetails && (
        <div>
          <p>Account Number: {accountDetails.accountNumber}</p>
          <p>Balance: {accountDetails.balance}</p>
        </div>
      )}
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleGenerateStatement}>Generate Statement</button>
    </div>
  );
};
