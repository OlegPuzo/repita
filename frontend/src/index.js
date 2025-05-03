import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем createRoot
import App from './App';

const container = document.getElementById('root'); // Получаем корневой элемент
const root = createRoot(container); // Создаем корень приложения
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);