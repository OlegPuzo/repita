import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const RatesTable = ({ rates }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Название</TableCell>
          <TableCell>Стоимость</TableCell>
          <TableCell>Способ оплаты</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rates.map((rate) => (
          <TableRow key={rate.id}>
            <TableCell>{rate.title}</TableCell>
            <TableCell>{rate.cost}</TableCell>
            <TableCell>{rate.payment_method}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RatesTable;