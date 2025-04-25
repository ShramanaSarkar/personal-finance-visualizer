import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const AddEditTransaction = ({ open, addTransaction, editingTransaction, updateTransaction, onCloseEdit }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amountError, setAmountError] = useState('');
  const [dateError, setDateError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const isEditMode = !!editingTransaction;

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDate(editingTransaction.date);
      setDescription(editingTransaction.description);
    } else {
      setAmount('');
      setDate('');
      setDescription('');
    }
    setAmountError('');
    setDateError('');
    setDescriptionError('');
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
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newTransaction = {
        id: isEditMode ? editingTransaction.id : uuidv4(),
        amount: parseFloat(amount),
        date: date,
        description: description.trim(),
      };

      if (isEditMode) {
        updateTransaction(newTransaction);
        onCloseEdit();
      } else {
        addTransaction(newTransaction);
        onCloseEdit();
      }
      setAmount('');
      setDate('');
      setDescription('');
    }
  };

  const handleClose = () => {
    if (onCloseEdit) {
      onCloseEdit();
    }
    setAmount('');
    setDate('');
    setDescription('');
    setAmountError('');
    setDateError('');
    setDescriptionError('');
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{isEditMode ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
      <DialogContent>
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
        />
        <TextField
          margin="dense"
          id="date"
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={!!dateError}
          helperText={dateError}
          InputLabelProps={{
            shrink: true,
          }}
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