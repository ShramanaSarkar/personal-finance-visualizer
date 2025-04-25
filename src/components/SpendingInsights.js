import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Box } from 'react-bootstrap-icons';

const SpendingInsights = ({ transactions, budgets }) => {
  const categoryExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.category && transaction.amount < 0) {
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  const overBudgetCategories = Object.keys(categoryExpenses)
    .filter(category => budgets[category] && categoryExpenses[category] > budgets[category]);

  const highestSpendingCategory = Object.keys(categoryExpenses).length > 0
    ? Object.keys(categoryExpenses).reduce((a, b) => categoryExpenses[a] > categoryExpenses[b] ? a : b)
    : null;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Spending Insights
        </Typography>
        {overBudgetCategories.length > 0 && (
          <Box mb={2}>
            <Typography variant="body2" color="error">
              Over Budget Categories:
            </Typography>
            <List dense>
              {overBudgetCategories.map(category => (
                <ListItem key={category}>
                  <ListItemText primary={category} secondary={`Spent: $${categoryExpenses[category].toFixed(2)}, Budget: $${budgets[category].toFixed(2)}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        {highestSpendingCategory && (
          <Typography variant="body2">
            Highest Spending Category: <Typography component="span" fontWeight="bold">{highestSpendingCategory}</Typography> (${categoryExpenses[highestSpendingCategory].toFixed(2)})
          </Typography>
        )}
        {Object.keys(categoryExpenses).length === 0 && (
          <Typography variant="body2">No spending data for the current month.</Typography>
        )}
        {overBudgetCategories.length === 0 && Object.keys(categoryExpenses).length > 0 && (
          <Typography variant="body2" color="success">
            You are within budget for all tracked categories this month.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingInsights;