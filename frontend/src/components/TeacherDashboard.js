import React, { useState } from 'react';
import { Container, Typography, Grid, Drawer, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ScheduleTeacher from './ScheduleTeacher';
import Chat from './Chat';

const TeacherDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('scheduleTeacher');

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
    setOpen(false);
  };

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      {/* Боковое меню */}
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={() => handleMenuClick('scheduleTeacher')}>
            <ListItemText primary="Расписание" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('chat')}>
            <ListItemText primary="Чат" />
          </ListItem>
        </List>
      </Drawer>

      {/* Заголовок */}
      <Typography variant="h3" align="center" gutterBottom>
        Панель управления
      </Typography>

      {/* Основной контент */}
      <Grid container spacing={2} style={{ height: 'calc(100vh - 100px)', marginTop: '20px' }}>
        <Grid item xs={12}>
          {selectedComponent === 'scheduleTeacher' && (
            <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
              <ScheduleTeacher />
            </Paper>
          )}
          {selectedComponent === 'chat' && (
            <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
              <Chat />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;