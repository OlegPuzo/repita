import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const StudentsTable = ({ students }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Имя</TableCell>
          <TableCell>Фамилия</TableCell>
          <TableCell>Телефон</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>ID преподавателя</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.first_name}</TableCell>
            <TableCell>{student.last_name}</TableCell>
            <TableCell>{student.phone}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.teacher_id || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentsTable;