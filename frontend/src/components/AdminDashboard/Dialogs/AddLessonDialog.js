import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Autocomplete,
  Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AddLessonDialog = ({
  open,
  onClose,
  lessonData,
  onLessonChange,
  filteredStudents,
  onStudentFilter,
  onAddLesson,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить урок</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Дата и время"
            value={lessonData.date}
            onChange={(newValue) => onLessonChange({ target: { name: 'date', value: newValue } })}
            renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
          />
        </LocalizationProvider>
        <TextField
          margin="dense"
          label="Длительность (минуты)"
          name="duration"
          fullWidth
          required
          value={lessonData.duration}
          onChange={onLessonChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isRecurring"
              checked={lessonData.isRecurring}
              onChange={onLessonChange}
            />
          }
          label="Повторяющийся урок"
        />
        {lessonData.isRecurring && (
          <>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox name="monday" />}
                label="Понедельник"
              />
              <FormControlLabel
                control={<Checkbox name="tuesday" />}
                label="Вторник"
              />
              <FormControlLabel
                control={<Checkbox name="wednesday" />}
                label="Среда"
              />
              <FormControlLabel
                control={<Checkbox name="thursday" />}
                label="Четверг"
              />
              <FormControlLabel
                control={<Checkbox name="friday" />}
                label="Пятница"
              />
              <FormControlLabel
                control={<Checkbox name="saturday" />}
                label="Суббота"
              />
              <FormControlLabel
                control={<Checkbox name="sunday" />}
                label="Воскресенье"
              />
            </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Дата окончания повторений"
                value={lessonData.endDate}
                onChange={(newValue) => onLessonChange({ target: { name: 'endDate', value: newValue } })}
                renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
              />
            </LocalizationProvider>
          </>
        )}
        <Autocomplete
          options={filteredStudents}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, newInputValue) => onStudentFilter(newInputValue)}
          renderInput={(params) => <TextField {...params} label="Ученик" fullWidth margin="dense" />}
        />
        <TextField
          margin="dense"
          label="Преподаватель"
          name="teacher"
          fullWidth
          required
          value={lessonData.teacher}
          onChange={onLessonChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onAddLesson}>Добавить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLessonDialog;