import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const AddRateDialog = ({ open, onClose, formData, onFormChange, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить ставку</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Название ставки"
          fullWidth
          required
          value={formData.title || ''}
          onChange={onFormChange}
        />
        <TextField
          name="cost"
          label="Стоимость"
          type="number"
          fullWidth
          required
          value={formData.cost || ''}
          onChange={onFormChange}
        />
        <TextField
          name="payment_method"
          label="Способ оплаты"
          fullWidth
          required
          value={formData.payment_method || ''}
          onChange={onFormChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onSubmit}>Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRateDialog;