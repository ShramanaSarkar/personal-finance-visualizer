import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import AddEditTransaction from './components/AddEditTransaction';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import ErrorMessage from './components/ErrorMessage';
import { useTransactions } from './hooks/useTransactions';
import Dashboard from './components/Dashboard'; // New component

const predefinedCategories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Rent', 'Salary', 'Other'];

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
    <Container maxWidth="lg">
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
          categories={predefinedCategories} // Pass categories
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Dashboard transactions={transactions} /> {/* Pass transactions to Dashboard */}
        </Grid>
        <Grid item xs={12} md={8}>
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
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Monthly Expenses
            </Typography>
            <MonthlyExpensesChart transactions={transactions} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;