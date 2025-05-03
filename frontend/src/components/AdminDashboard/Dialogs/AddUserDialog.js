import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const AddUserDialog = ({ open, onClose, dialogType, formData, onFormChange, emailError, phoneError }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить {dialogType}</DialogTitle>
      <DialogContent>
        <TextField
          name="first_name"
          label="Имя"
          fullWidth
          required
          value={formData.first_name || ''}
          onChange={onFormChange}
        />
        <TextField
          name="last_name"
          label="Фамилия"
          fullWidth
          required
          value={formData.last_name || ''}
          onChange={onFormChange}
        />
        <TextField
          name="phone"
          label="Телефон"
          fullWidth
          required
          value={formData.phone || ''}
          onChange={onFormChange}
          error={phoneError}
          helperText={phoneError ? 'Некорректный номер телефона' : ''}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          required
          value={formData.email || ''}
          onChange={onFormChange}
          error={emailError}
          helperText={emailError ? 'Некорректный email' : ''}
        />
        <TextField
          name="password"
          label="Пароль"
          type="password"
          fullWidth
          required
          value={formData.password || ''}
          onChange={onFormChange}
        />
        {dialogType === 'teacher' && (
          <FormControl fullWidth>
            <InputLabel id="rate-label">Ставка</InputLabel>
            <Select
              labelId="rate-label"
              name="rate_id"
              value={formData.rate_id || ''}
              onChange={onFormChange}
            >
              <MenuItem value="1">Ставка 1</MenuItem>
              <MenuItem value="2">Ставка 2</MenuItem>
            </Select>
          </FormControl>
        )}
        {dialogType === 'student' && (
          <TextField
            name="teacher_id"
            label="ID преподавателя"
            fullWidth
            value={formData.teacher_id || ''}
            onChange={onFormChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onClose}>Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;