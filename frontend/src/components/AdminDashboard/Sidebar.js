import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ isDrawerOpen, setIsDrawerOpen, setSelectedComponent }) => {
  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List>
          <ListItem button onClick={() => setSelectedComponent('admin')}>
            <ListItemText primary="Административная панель" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('chat')}>
            <ListItemText primary="Чат" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('schedule')}>
            <ListItemText primary="Расписание" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;