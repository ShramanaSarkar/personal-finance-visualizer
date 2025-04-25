import React from 'react';
import { Alert, IconButton } from '@mui/material';
import { X } from 'react-bootstrap-icons';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <X fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  );
};

export default ErrorMessage;
