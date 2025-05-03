import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const TeachersTable = ({ teachers, rates }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Имя</TableCell>
          <TableCell>Фамилия</TableCell>
          <TableCell>Телефон</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Ставка</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>{teacher.first_name}</TableCell>
            <TableCell>{teacher.last_name}</TableCell>
            <TableCell>{teacher.phone}</TableCell>
            <TableCell>{teacher.email}</TableCell>
            <TableCell>{rates.find((r) => r.id === teacher.rate_id)?.title || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeachersTable;