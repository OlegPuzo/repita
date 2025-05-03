import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.email && !formData.password) {
      alert('Введите логин и пароль');
      return false;
    }
    if (!formData.email) {
      alert('Введите логин');
      return false;
    }
    if (!formData.password) {
      alert('Введите пароль');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await axios.post("/api/auth/login", formData);
      
      console.log('Ответ сервера:', response.data);
      
      if (!response.data.access_token) {
        throw new Error('Токен отсутствует в ответе');
      }

      const roleRoutes = {
        student: '/dashboard',
        manager: '/managerdashboard',
        teacher: '/teacherdashboard'
      };

      const route = roleRoutes[response.data.role];
      
      if (!route) {
        throw new Error('Неизвестная роль');
      }

      navigate(route);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Неправильный логин или пароль';
      console.error('Ошибка входа:', error.response?.data || error.message);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Вход в систему
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={isLoading}
            sx={{ mt: 2 }}
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;