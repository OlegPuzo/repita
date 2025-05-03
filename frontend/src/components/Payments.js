import React from 'react';
import { Paper, Typography } from '@mui/material';

const Payments = () => {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5">Платежи и абонементы</Typography>
      {/* Здесь можно отобразить историю платежей */}
      <Typography variant="body1">Нет платежей</Typography>
    </Paper>
  );
};

export default Payments;
