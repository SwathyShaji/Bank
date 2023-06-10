import React, { useEffect, useState } from 'react';
import { generateAccountStatement } from '../api'; // Import the API function for account statement

export const AccountStatementPage = () => {
  const [accountStatement, setAccountStatement] = useState('');

  const handleGenerateStatement = async () => {
    try {
      const response = await generateAccountStatement(); // Make the API call to generate the account statement
      setAccountStatement(response.data.statement); // Update the account statement state
    } catch (error) {
      console.error('Error generating account statement:', error);
    }
  };

  useEffect(() => {
    handleGenerateStatement();
  }, []);

  return (
    <div>
      <h2>Account Statement</h2>
      {accountStatement ? (
        <pre>{accountStatement}</pre>
      ) : (
        <p>Generating account statement...</p>
      )}
    </div>
  );
};
