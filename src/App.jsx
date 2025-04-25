import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import AddEditTransaction from './components/AddEditTransaction';
import TransactionList from './components/TransactionList';
import MonthlyExpensesChart from './components/MonthlyExpensesChart';
import ErrorMessage from './components/ErrorMessage';
import { useTransactions } from './hooks/useTransactions';
import Dashboard from './components/Dashboard';
import BudgetSettings from './components/BudgetSettings'; // New component
import BudgetComparisonChart from './components/BudgetComparisonChart'; // New component
import SpendingInsights from './components/SpendingInsights'; // New component

const predefinedCategories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Rent', 'Salary', 'Other'];

function App() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction, error, clearError } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [monthlyBudgets, setMonthlyBudgets] = useState(() => {
    const storedBudgets = localStorage.getItem('monthlyBudgets');
    return storedBudgets ? JSON.parse(storedBudgets) : {};
  });

  useEffect(() => {
    localStorage.setItem('monthlyBudgets', JSON.stringify(monthlyBudgets));
  }, [monthlyBudgets]);

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

  const handleBudgetChange = (category, amount) => {
    setMonthlyBudgets(prevBudgets => ({
      ...prevBudgets,
      [category]: parseFloat(amount),
    }));
  };

  const currentMonthYear = new Date().toISOString().slice(0, 7);
  console.log("Current Month Year:", currentMonthYear);
  const currentMonthTransactions = transactions.filter(
    (t) => t.date.startsWith(currentMonthYear) && t.amount < 0
  );
  console.log("Sample Transaction Date:", transactions[0]?.date); // Check the first transaction

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
          categories={predefinedCategories}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} width="100%">
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
        <Grid item xs={12} md={6} width="100%">
          <Dashboard transactions={transactions} />
        </Grid>
        
        <Grid item xs={12} md={4} width="45%">
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Monthly Expenses
            </Typography>
            <MonthlyExpensesChart transactions={transactions} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} width="45%">
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Budget vs Actual ({currentMonthYear})
            </Typography>
            <BudgetComparisonChart
              budgets={monthlyBudgets}
              transactions={currentMonthTransactions}
              categories={predefinedCategories}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Budget Settings
            </Typography>
            <BudgetSettings
              budgets={monthlyBudgets}
              categories={predefinedCategories}
              onBudgetChange={handleBudgetChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Spending Insights ({currentMonthYear})
            </Typography>
            <SpendingInsights transactions={currentMonthTransactions} budgets={monthlyBudgets} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;