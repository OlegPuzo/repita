import React from 'react';
import { Tabs, Tab } from '@mui/material';

const UserTabs = ({ tabIndex, onTabChange }) => {
  return (
    <Tabs value={tabIndex} onChange={onTabChange}>
      <Tab label="Преподаватели" />
      <Tab label="Ученики" />
      <Tab label="Ставки" />
    </Tabs>
  );
};

export default UserTabs;