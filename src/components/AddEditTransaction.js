import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { v4 as uuidv4 } from 'uuid';

const AddEditTransaction = ({ open, addTransaction, editingTransaction, updateTransaction, onCloseEdit, categories }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const isEditMode = !!editingTransaction;

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDate(new Date(editingTransaction.date));
      setDescription(editingTransaction.description);
      setCategory(editingTransaction.category || '');
    } else {
      setAmount('');
      setDate(new Date());
      setDescription('');
      setCategory('');
    }
    setAmountError('');
    setDateError('');
    setDescriptionError('');
    setCategoryError('');
  }, [editingTransaction]);

  const validateForm = () => {
    let isValid = true;
    if (!amount || isNaN(Number(amount))) {
      setAmountError('Please enter a valid amount.');
      isValid = false;
    } else {
      setAmountError('');
    }
    if (!date) {
      setDateError('Please select a date.');
      isValid = false;
    } else {
      setDateError('');
    }
    if (!description.trim()) {
      setDescriptionError('Please enter a description.');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    if (!category) {
      setCategoryError('Please select a category.');
      isValid = false;
    } else {
      setCategoryError('');
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newTransaction = {
        id: isEditMode ? editingTransaction.id : uuidv4(),
        amount: parseFloat(amount),
        date: date.toISOString().split('T')[0],
        description: description.trim(),
        category: category,
      };

      if (isEditMode) {
        updateTransaction(newTransaction);
        onCloseEdit();
      } else {
        addTransaction(newTransaction);
        onCloseEdit();
      }
      setAmount('');
      setDate(new Date());
      setDescription('');
      setCategory('');
    }
  };

  const handleClose = () => {
    if (onCloseEdit) {
      onCloseEdit();
    }
    setAmount('');
    setDate(new Date());
    setDescription('');
    setCategory('');
    setAmountError('');
    setDateError('');
    setDescriptionError('');
    setCategoryError('');
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{isEditMode ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={!!amountError}
            helperText={amountError}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                fullWidth
                error={!!dateError}
                helperText={dateError}
              />
            )}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!descriptionError}
            helperText={descriptionError}
          />
          <FormControl fullWidth margin="dense" error={!!categoryError}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            {categoryError && <FormHelperText>{categoryError}</FormHelperText>}
          </FormControl>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {isEditMode ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTransaction;