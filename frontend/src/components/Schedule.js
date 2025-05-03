import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

// Функция для получения занятий с API
const fetchLessons = async () => {
  // Замените на реальный вызов API
  return [
    { datetime: { id: 1, name: 'Математика', date: '2025-03-19', time: '10:00', duration: 90, teacher_name: 'Иванов И.И.', link_to_connect: 'https://telemost.yandex.ru/j/45504778460406843891467360805707520187', record_link: 'https://telemost.yandex.ru/j/45504778460406843891467360805707520187' } },
    { datetime: { id: 2, name: 'Наука', date: '2025-03-20', time: '14:00', duration: 60, teacher_name: 'Петров П.П.', link_to_connect: 'https://chat.mistral.ai/chat/833fd8cd-2673-47c6-9368-8ae32b57c2d7', record_link: 'https://telemost.yandex.ru/j/45504778460406843891467360805707520187' } },
    // Добавьте больше занятий по необходимости
  ];
};

export const LessonRecord = ({ lesson, onClose }) => {
  return (
    <Dialog open={!!lesson} onClose={onClose}>
      <DialogTitle>{lesson.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Дата: {lesson.date}</Typography>
        <Typography variant="body1">Время: {lesson.time}</Typography>
        <Typography variant="body1">Продолжительность: {lesson.duration} минут</Typography>
        <Typography variant="body1">Преподаватель: {lesson.teacher_name}</Typography>
        {lesson.link_to_connect && <Typography variant="body1">Ссылка для подключения: {lesson.link_to_connect}</Typography>}
        {lesson.record_link && <Typography variant="body1">Ссылка на запись: {lesson.record_link}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Schedule = () => {
  const [lessons, setLessons] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const getLessons = async () => {
      const data = await fetchLessons();
      // Извлекаем данные из 'datetime'
      const lessonsData = data.map(item => item.datetime);
      setLessons(lessonsData);
    };
    getLessons();
  }, [currentWeek]); // Перезагружаем данные при изменении текущей недели

  const handleWeekChange = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + direction * 7);
    setCurrentWeek(newWeek);
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const closeLessonRecord = () => {
    setSelectedLesson(null);
  };

  const renderCalendar = () => {
    const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const timeSlots = Array.from({ length: 13 }, (_, i) => 10 + i); // from 10:00 to 22:00

    const days = [];
    const startDate = new Date(currentWeek);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Начало недели

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      days.push(date);
    }

    return (
      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '100px' }}></TableCell>
            {days.map((day) => (
              <TableCell key={day.toDateString()} align="center" style={{ width: '14%' }}>
                <Typography>{daysOfWeek[day.getDay()]}</Typography>
                <Typography variant="caption">{day.toLocaleDateString()}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((hour) => (
            <TableRow key={hour}>
              <TableCell style={{ width: '100px' }}>{hour}:00</TableCell>
              {days.map((day) => (
                <TableCell key={day.toDateString()} style={{ padding: 8 }}>
                  {lessons
                    .filter((lesson) => new Date(lesson.date).toDateString() === day.toDateString() && parseInt(lesson.time.split(':')[0]) === hour)
                    .map((lesson) => (
                      <Button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        style={{
                          display: 'block',
                          marginTop: 8,
                          backgroundColor: '#e3f2fd',
                          color: 'black',
                          width: '100%',
                          padding: 8,
                          textAlign: 'left',
                        }}
                      >
                        {lesson.name}
                      </Button>
                    ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" align="center" >Расписание занятий</Typography>
      <Grid container justifyContent="space-between" style={{ marginBottom: 16 }}>
        <Button onClick={() => handleWeekChange(-1)}>Предыдущая неделя</Button>
        <Button onClick={() => handleWeekChange(1)}>Следующая неделя</Button>
      </Grid>
      {renderCalendar()}
      {selectedLesson && (
        <LessonRecord lesson={selectedLesson} onClose={closeLessonRecord} />
      )}
    </Paper>
  );
};

export default Schedule;