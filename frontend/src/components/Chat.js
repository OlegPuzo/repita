import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem } from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text.trim()) {
      setMessages([...messages, text]);
      setText('');
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5">Чат с преподавателем</Typography>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>{msg}</ListItem>
        ))}
      </List>
      <TextField
        label="Сообщение"
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginTop: 8 }}>
        Отправить
      </Button>
    </Paper>
  );
};

export default Chat;
