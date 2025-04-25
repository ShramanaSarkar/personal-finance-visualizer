import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const MonthlyExpensesChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions to display on the chart.</p>;
  }

  const monthlyExpenses = transactions.reduce((acc, transaction) => {
    const monthYear = format(new Date(transaction.date), 'yyyy-MM');
    acc[monthYear] = (acc[monthYear] || 0) + transaction.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyExpenses)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([monthYear, total]) => ({
      month: format(new Date(monthYear + '-01'), 'MMM yyyy'),
      expenses: total,
    }));

  return (
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
      <Legend />
      <Bar dataKey="expenses" fill="#8884d8" name="Monthly Expenses" />
    </BarChart>
  );
};

export default MonthlyExpensesChart;