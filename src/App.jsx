import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import AddEditTransaction from './components/AddEditTransaction';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import ErrorMessage from './components/ErrorMessage';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, error, clearError } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);

  const handleAddTransactionClick = () => {
    setEditingTransaction(null);
    setIsAddEditDialogOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsAddEditDialogOpen(true); 
  };

  const handleCloseAddEditDialog = () => {
    setIsAddEditDialogOpen(false);
    setEditingTransaction(null);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Personal Finance Visualizer
      </Typography>

      {error && <ErrorMessage message={error} onClose={clearError} />}

      <Box mb={3}>
        <Button variant="contained" color="primary" onClick={handleAddTransactionClick}>
          Add New Transaction
        </Button>
        <AddEditTransaction
          open={isAddEditDialogOpen}
          addTransaction={addTransaction}
          editingTransaction={editingTransaction}
          updateTransaction={updateTransaction}
          onCloseEdit={handleCloseAddEditDialog}
        />
      </Box>

      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Transaction List
        </Typography>
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={deleteTransaction}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Monthly Expenses
        </Typography>
        <MonthlyExpensesChart transactions={transactions} />
      </Box>
    </Container>
  );
}

export default App;