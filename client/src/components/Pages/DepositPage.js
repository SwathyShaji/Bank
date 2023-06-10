import React, { useState } from 'react';
import { depositAmount } from '../api'; // Import the API function for deposit

export const DepositPage = () => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      await depositAmount(amount); // Make the API call to deposit the amount
      alert('Deposit successful');
      setAmount(''); // Clear the input field
    } catch (error) {
      console.error('Error depositing amount:', error);
      alert('Failed to deposit amount');
    }
  };

  return (
    <div>
      <h2>Deposit</h2>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
};
