import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid } from '@mui/material';
import { Box } from 'react-bootstrap-icons';

const BudgetSettings = ({ budgets, categories, onBudgetChange }) => {
  const [categoryBudgets, setCategoryBudgets] = useState(budgets);

  const handleInputChange = (category, value) => {
    setCategoryBudgets(prev => ({
      ...prev,
      [category]: value === '' ? undefined : parseFloat(value),
    }));
  };

  const handleSaveBudgets = () => {
    categories.forEach(category => {
      onBudgetChange(category, categoryBudgets[category]);
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Set Monthly Budgets
        </Typography>
        <Grid container spacing={2}>
          {categories.map(category => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <TextField
                label={category}
                type="number"
                value={categoryBudgets[category] === undefined ? '' : categoryBudgets[category]}
                onChange={(e) => handleInputChange(category, e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          ))}
          <Button onClick={handleSaveBudgets} color="primary">
            Save Budgets
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BudgetSettings;