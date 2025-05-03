import React from 'react';
import { Paper, Typography } from '@mui/material';

const Materials = () => {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5">Учебные материалы</Typography>
      {/* Здесь можно вывести список материалов */}
      <Typography variant="body1">Нет доступных материалов</Typography>
    </Paper>
  );
};

export default Materials;
