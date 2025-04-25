import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetComparisonChart = ({ budgets, transactions, categories }) => {
  console.log("BudgetComparisonChart - Budgets:", budgets);
  console.log("BudgetComparisonChart - Transactions:", transactions);

  const categoryExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.category) {
      console.log(`Processing transaction: ${transaction.description}, Category: ${transaction.category}, Amount: ${transaction.amount}`);
      acc[transaction.category] = (acc[transaction.category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {});

  console.log("BudgetComparisonChart - Calculated Category Expenses:", categoryExpenses);
  const chartData = categories.map(category => ({
    name: category,
    budget: budgets[category] || 0,
    actual: categoryExpenses[category] || 0,
  }));

  console.log("BudgetComparisonChart - Chart Data:", chartData);

  useEffect(() => {
    console.log("BudgetComparisonChart - Transactions prop updated:", transactions);
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
        <Bar dataKey="actual" fill="#ffc658" name="Actual Spending" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;