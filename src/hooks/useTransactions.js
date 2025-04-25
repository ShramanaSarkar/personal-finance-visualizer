import { useState } from 'react';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    setError(null);
  };

  const updateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setError(null);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(newTransactions);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return { transactions, addTransaction, updateTransaction, deleteTransaction, error, clearError };
};