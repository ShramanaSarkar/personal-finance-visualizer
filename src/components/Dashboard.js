import React from 'react';
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import CategoryPieChart from './CategoryPieChart';

const Dashboard = ({ transactions }) => {
  const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  const categoryExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.category) {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  const sortedCategoryExpenses = Object.entries(categoryExpenses)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3); // Top 3 categories

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5); // Most recent 5

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dashboard
        </Typography>

        <Box mb={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Total Expenses
              </Typography>
              <Typography variant="h5">${totalExpenses.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Category Breakdown
          </Typography>
          <CategoryPieChart transactions={transactions} />
        </Box>

        <Box>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Recent Transactions
          </Typography>
          <List dense>
            {recentTransactions.map((transaction) => (
              <ListItem key={transaction.id}>
                <ListItemText
                  primary={`${transaction.description} (${transaction.category})`}
                  secondary={`$${transaction.amount.toFixed(2)} - ${transaction.date}`}
                />
              </ListItem>
            ))}
            {recentTransactions.length === 0 && (
              <ListItem>
                <ListItemText primary="No recent transactions." />
              </ListItem>
            )}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Dashboard;