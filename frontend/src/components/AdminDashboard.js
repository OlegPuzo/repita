// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Paper,
//   Container,
//   Grid,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import axios from 'axios';
// import MenuIcon from '@mui/icons-material/Menu'; // Иконка для бургер-меню
// import Schedule from './Schedule';
// import Chat from './Chat';

// const AdminDashboard = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [teachers, setTeachers] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [managers, setManagers] = useState([]);
//   const [rates, setRates] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogType, setDialogType] = useState(''); // 'teacher', 'student', 'manager', 'rate'
//   const [formData, setFormData] = useState({});
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Состояние для открытия/закрытия меню
//   const [selectedComponent, setSelectedComponent] = useState('admin'); // Текущий выбранный компонент
//   const [emailError, setEmailError] = useState(false); // Ошибка email
//   const [phoneError, setPhoneError] = useState(false); // Ошибка телефона

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const apiUrl = '/api/admin'; // Базовый URL API
//       const [teachersRes, studentsRes, managersRes, ratesRes] = await Promise.all([
//         axios.get(`${apiUrl}/teachers`),
//         axios.get(`${apiUrl}/students`),
//         axios.get(`${apiUrl}/managers`),
//         axios.get(`${apiUrl}/rates`),
//       ]);
//       setTeachers(teachersRes.data);
//       setStudents(studentsRes.data);
//       setManagers(managersRes.data);
//       setRates(ratesRes.data);
//     } catch (error) {
//       console.error('Ошибка получения данных:', error.message || error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (emailError || phoneError) {
//       alert("Пожалуйста, исправьте ошибки в форме");
//       return;
//     }

//     try {
//       let endpoint = '';
//       if (dialogType === 'teacher') {
//         endpoint = '/api/admin/teachers';
//       } else if (dialogType === 'student') {
//         endpoint = '/api/admin/students';
//       } else if (dialogType === 'manager') {
//         endpoint = '/api/admin/managers';
//       } else if (dialogType === 'rate') {
//         endpoint = '/api/admin/rates';
//       }
//       console.log(formData)
//       await axios.post(endpoint, formData);
//       fetchData(); // Обновляем данные после успешного добавления
//       setOpenDialog(false);
//     } catch (error) {
//       console.error('Ошибка создания записи:', error.message || error);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue);
//   };

//   const handleOpenDialog = (type) => {
//     setDialogType(type);
//     setFormData(
//       type === 'teacher'
//         ? { first_name: '', last_name: '', phone: '', email: '', password: '', rate_id: '' }
//         : type === 'student'
//         ? { first_name: '', last_name: '', phone: '', email: '', password: '', teacher_id: '' }
//         : type === 'manager'
//         ? { first_name: '', last_name: '', phone: '', email: '', password: '' }
//         : { title: '', cost: '', payment_method: '' }
//     );
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;

//     // Проверка на корректность email
//     if (name === 'email') {
//       const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//       setEmailError(!isValidEmail && value !== '');
//     }

//     // Проверка на корректность телефона
//     if (name === 'phone') {
//       const isValidPhone = /^\d{10,15}$/.test(value); // Телефон должен содержать только цифры и быть длиной 10-15 символов
//       setPhoneError(!isValidPhone && value !== '');
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const renderTable = () => {
//     if (tabIndex === 0) {
//       return (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Имя</TableCell>
//               <TableCell>Фамилия</TableCell>
//               <TableCell>Телефон</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Ставка</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {teachers.map((teacher) => (
//               <TableRow key={teacher.id}>
//                 <TableCell>{teacher.first_name}</TableCell>
//                 <TableCell>{teacher.last_name}</TableCell>
//                 <TableCell>{teacher.phone}</TableCell>
//                 <TableCell>{teacher.email}</TableCell>
//                 <TableCell>{rates.find((r) => r.id === teacher.rate_id)?.title || '-'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       );
//     } else if (tabIndex === 1) {
//       return (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Имя</TableCell>
//               <TableCell>Фамилия</TableCell>
//               <TableCell>Телефон</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>ID преподавателя</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((student) => (
//               <TableRow key={student.id}>
//                 <TableCell>{student.first_name}</TableCell>
//                 <TableCell>{student.last_name}</TableCell>
//                 <TableCell>{student.phone}</TableCell>
//                 <TableCell>{student.email}</TableCell>
//                 <TableCell>{student.teacher_id || '-'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       );
//     } else if (tabIndex === 2) {
//       return (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Имя</TableCell>
//               <TableCell>Фамилия</TableCell>
//               <TableCell>Телефон</TableCell>
//               <TableCell>Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {managers.map((manager) => (
//               <TableRow key={manager.id}>
//                 <TableCell>{manager.first_name}</TableCell>
//                 <TableCell>{manager.last_name}</TableCell>
//                 <TableCell>{manager.phone}</TableCell>
//                 <TableCell>{manager.email}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       );
//     } else if (tabIndex === 3) {
//       return (
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Название</TableCell>
//               <TableCell>Стоимость</TableCell>
//               <TableCell>Способ оплаты</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rates.map((rate) => (
//               <TableRow key={rate.id}>
//                 <TableCell>{rate.title}</TableCell>
//                 <TableCell>{rate.cost}</TableCell>
//                 <TableCell>{rate.payment_method}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       );
//     }
//   };

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

//   const handleMenuClick = (component) => {
//     setSelectedComponent(component);
//     setIsDrawerOpen(false);
//   };

//   return (
//     <Container maxWidth={false} style={{ padding: 0 }}>
//       {/* Боковое меню */}
//       <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
//         <MenuIcon />
//       </IconButton>
//       <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
//         <List>
//           <ListItem button onClick={() => handleMenuClick('admin')}>
//             <ListItemText primary="Административная панель" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuClick('chat')}>
//             <ListItemText primary="Чат" />
//           </ListItem>
//           <ListItem button onClick={() => handleMenuClick('schedule')}>
//             <ListItemText primary="Расписание" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Заголовок */}
//       <Typography variant="h3" align="center" gutterBottom>
//         Личный кабинет
//       </Typography>

//       {/* Основной контент */}
//       <Grid container spacing={2} style={{ height: 'calc(100vh - 100px)', marginTop: '20px' }}>
//         <Grid item xs={12}>
//           {selectedComponent === 'admin' && (
//             <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
//               <Typography variant="h4" gutterBottom>
//                 Административная панель
//               </Typography>
//               <Tabs value={tabIndex} onChange={handleTabChange}>
//                 <Tab label="Преподаватели" />
//                 <Tab label="Ученики" />
//                 {/* <Tab label="Менеджеры" /> */}
//                 <Tab label="Ставки" />
//               </Tabs>
//               <Box sx={{ mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   onClick={() =>
//                     handleOpenDialog(
//                       tabIndex === 0
//                         ? 'teacher'
//                         : tabIndex === 1
//                         ? 'student'
//                         // : tabIndex === 2
//                         // ? 'manager'
//                         : 'rate'
//                     )
//                   }
//                 >
//                   Добавить{' '}
//                   {tabIndex === 0
//                     ? 'преподавателя'
//                     : tabIndex === 1
//                     ? 'ученика'
//                     // : tabIndex === 2
//                     // ? 'менеджера'
//                     : 'ставку'}
//                 </Button>
//                 {renderTable()}
//               </Box>
//               <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>
//                   Добавить{' '}
//                   {dialogType === 'teacher'
//                     ? 'преподавателя'
//                     : dialogType === 'student'
//                     ? 'ученика'
//                     // : dialogType === 'manager'
//                     // ? 'менеджера'
//                     : 'ставку'}
//                 </DialogTitle>
//                 <DialogContent>
//                   {dialogType === 'teacher' && (
//                     <>
//                       <TextField
//                         margin="dense"
//                         label="Имя *"
//                         name="first_name"
//                         fullWidth
//                         required
//                         value={formData.first_name}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Фамилия *"
//                         name="last_name"
//                         fullWidth
//                         required
//                         value={formData.last_name}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Телефон *"
//                         name="phone"
//                         fullWidth
//                         required
//                         value={formData.phone}
//                         onChange={handleFormChange}
//                         error={phoneError} // Применяем ошибку к полю
//                         helperText={phoneError ? "Неправильный ввод" : ""} // Сообщение об ошибке
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Email *"
//                         name="email"
//                         type="email"
//                         fullWidth
//                         required
//                         value={formData.email}
//                         onChange={handleFormChange}
//                         error={emailError} // Применяем ошибку к полю
//                         helperText={emailError ? "Неправильный ввод" : ""} // Сообщение об ошибке
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Пароль *"
//                         name="password"
//                         type="password"
//                         fullWidth
//                         required
//                         value={formData.password}
//                         onChange={handleFormChange}
//                       />
//                       <FormControl fullWidth margin="dense" required>
//                         <InputLabel id="rate-label">Ставка *</InputLabel>
//                         <Select
//                           labelId="rate-label"
//                           label="Ставка *"
//                           name="rate_id"
//                           value={formData.rate_id}
//                           onChange={handleFormChange}
//                         >
//                           {rates.map((rate) => (
//                             <MenuItem key={rate.id} value={rate.id}>
//                               {rate.title} ({rate.payment_method} - {rate.cost})
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     </>
//                   )}
//                   {dialogType === 'student' && (
//                     <>
//                       <TextField
//                         margin="dense"
//                         label="Имя *"
//                         name="first_name"
//                         fullWidth
//                         required
//                         value={formData.first_name}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Фамилия *"
//                         name="last_name"
//                         fullWidth
//                         required
//                         value={formData.last_name}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Телефон *"
//                         name="phone"
//                         fullWidth
//                         required
//                         value={formData.phone}
//                         onChange={handleFormChange}
//                         error={phoneError} // Применяем ошибку к полю
//                         helperText={phoneError ? "Неправильный ввод" : ""} // Сообщение об ошибке
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Email *"
//                         name="email"
//                         type="email"
//                         fullWidth
//                         required
//                         value={formData.email}
//                         onChange={handleFormChange}
//                         error={emailError} // Применяем ошибку к полю
//                         helperText={emailError ? "Неправильный ввод" : ""} // Сообщение об ошибке
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Пароль *"
//                         name="password"
//                         type="password"
//                         fullWidth
//                         required
//                         value={formData.password}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="ID преподавателя *"
//                         name="teacher_id"
//                         fullWidth
//                         required
//                         value={formData.teacher_id}
//                         onChange={handleFormChange}
//                       />
//                     </>
//                   )}
//                   {dialogType === 'manager' && (
//                     <>
//                       <TextField
//                         margin="dense"
//                         label="Имя *"
//                         name="first_name"
//                         fullWidth
//                         required
//                         value={formData.first_name}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Фамилия *"
//                         name="last_name"
//                         fullWidth
//                         required
//                         value={formData.last_name}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Телефон *"
//                         name="phone"
//                         fullWidth
//                         required
//                         value={formData.phone}
//                         onChange={handleFormChange}
//                         error={phoneError} // Применяем ошибку к полю
//                         helperText={phoneError ? "Неправильный ввод" : ""} // Сообщение об ошибке
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Email *"
//                         name="email"
//                         type="email"
//                         fullWidth
//                         required
//                         value={formData.email}
//                         onChange={handleFormChange}
//                         error={emailError} // Применяем ошибку к полю
//                         helperText={emailError ? "Неправильный ввод" : ""} // Сообщение об ошибке
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Пароль *"
//                         name="password"
//                         type="password"
//                         fullWidth
//                         required
//                         value={formData.password}
//                         onChange={handleFormChange}
//                       />
//                     </>
//                   )}
//                   {dialogType === 'rate' && (
//                     <>
//                       <TextField
//                         margin="dense"
//                         label="Название *"
//                         name="title"
//                         fullWidth
//                         required
//                         value={formData.title}
//                         onChange={handleFormChange}
//                       />
//                       <TextField
//                         margin="dense"
//                         label="Стоимость *"
//                         name="cost"
//                         type="number"
//                         fullWidth
//                         required
//                         value={formData.cost}
//                         onChange={handleFormChange}
//                       />
//                       <FormControl fullWidth margin="dense" required>
//                         <InputLabel id="payment-label">Способ оплаты *</InputLabel>
//                         <Select
//                           labelId="payment-label"
//                           label="Способ оплаты *"
//                           name="payment_method"
//                           value={formData.payment_method}
//                           onChange={handleFormChange}
//                         >
//                           <MenuItem value="hourly">По часам</MenuItem>
//                           <MenuItem value="monthly">За месяц</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </>
//                   )}
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleCloseDialog}>Отмена</Button>
//                   <Button onClick={handleSubmit}>Добавить</Button>
//                 </DialogActions>
//               </Dialog>
//             </Paper>
//           )}
//           {selectedComponent === 'schedule' && (
//             <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
//               <Schedule />
//             </Paper>
//           )}
//           {selectedComponent === 'chat' && (
//             <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
//               <Chat />
//             </Paper>
//           )}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Container,
  Grid,
  Tabs,
  Tab,
  Autocomplete,
} from '@mui/material';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu'; // Иконка для бургер-меню
import Schedule from './Schedule';
import Chat from './Chat';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Для выбора даты и времени
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [managers, setManagers] = useState([]);
  const [rates, setRates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false); // Новое состояние для диалога урока
  const [dialogType, setDialogType] = useState(''); // 'teacher', 'student', 'manager', 'rate'
  const [formData, setFormData] = useState({});
  const [lessonData, setLessonData] = useState({
    date: null,
    time: null,
    isRecurring: false,
    recurringDays: [],
    endDate: null,
    teacher: '',
    student: '',
    duration: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Состояние для открытия/закрытия меню
  const [selectedComponent, setSelectedComponent] = useState('admin'); // Текущий выбранный компонент
  const [emailError, setEmailError] = useState(false); // Ошибка email
  const [phoneError, setPhoneError] = useState(false); // Ошибка телефона
  const [allStudents, setAllStudents] = useState([]); // Все студенты
  const [filteredStudents, setFilteredStudents] = useState([]); // Отфильтрованные студенты

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = '/api/admin'; // Базовый URL API
      const [teachersRes, studentsRes, managersRes, ratesRes] = await Promise.all([
        axios.get(`${apiUrl}/teachers`),
        axios.get(`${apiUrl}/students`),
        axios.get(`${apiUrl}/managers`),
        axios.get(`${apiUrl}/rates`),
      ]);
      setTeachers(teachersRes.data);
      setStudents(studentsRes.data);
      setManagers(managersRes.data);
      setRates(ratesRes.data);
    } catch (error) {
      console.error('Ошибка получения данных:', error.message || error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.post('/api/auth/get_all_users', { role: 'student' });
      setAllStudents(response.data.users);
    } catch (error) {
      console.error('Ошибка получения студентов:', error.message || error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setFormData(
      type === 'teacher'
        ? { first_name: '', last_name: '', phone: '', email: '', password: '', rate_id: '' }
        : type === 'student'
        ? { first_name: '', last_name: '', phone: '', email: '', password: '', teacher_id: '' }
        : type === 'manager'
        ? { first_name: '', last_name: '', phone: '', email: '', password: '' }
        : { title: '', cost: '', payment_method: '' }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Проверка на корректность email
    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(!isValidEmail && value !== '');
    }
    // Проверка на корректность телефона
    if (name === 'phone') {
      const isValidPhone = /^\d{10,15}$/.test(value); // Телефон должен содержать только цифры и быть длиной 10-15 символов
      setPhoneError(!isValidPhone && value !== '');
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleLessonChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setLessonData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setLessonData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleStudentFilter = (inputValue) => {
    const filtered = allStudents.filter((student) =>
      student.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleAddLesson = () => {
    console.log(lessonData);
    // Здесь можно отправить данные на сервер
    setLessonDialogOpen(false);
  };

  const renderTable = () => {
    if (tabIndex === 0) {
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
    } else if (tabIndex === 1) {
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
    } else if (tabIndex === 2) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell>{manager.first_name}</TableCell>
                <TableCell>{manager.last_name}</TableCell>
                <TableCell>{manager.phone}</TableCell>
                <TableCell>{manager.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (tabIndex === 3) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Способ оплаты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>{rate.title}</TableCell>
                <TableCell>{rate.cost}</TableCell>
                <TableCell>{rate.payment_method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      {/* Боковое меню */}
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

      {/* Заголовок */}
      <Typography variant="h3" align="center" gutterBottom>
        Личный кабинет
      </Typography>

      {/* Основной контент */}
      <Grid container spacing={2} style={{ height: 'calc(100vh - 100px)', marginTop: '20px' }}>
        <Grid item xs={12}>
          {selectedComponent === 'admin' && (
            <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
              <Typography variant="h4" gutterBottom>
                Административная панель
              </Typography>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Преподаватели" />
                <Tab label="Ученики" />
                <Tab label="Ставки" />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => setLessonDialogOpen(true)}>
                  Добавить урок
                </Button>
                {renderTable()}
              </Box>
              <Dialog open={lessonDialogOpen} onClose={() => setLessonDialogOpen(false)}>
                <DialogTitle>Добавить урок</DialogTitle>
                <DialogContent>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Дата и время"
                      value={lessonData.date}
                      onChange={(newValue) => setLessonData((prev) => ({ ...prev, date: newValue }))}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <TextField
                    margin="dense"
                    label="Длительность (минуты)"
                    name="duration"
                    fullWidth
                    required
                    value={lessonData.duration}
                    onChange={handleLessonChange}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isRecurring"
                        checked={lessonData.isRecurring}
                        onChange={handleLessonChange}
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
                          onChange={(newValue) => setLessonData((prev) => ({ ...prev, endDate: newValue }))}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                  <Autocomplete
                    options={filteredStudents}
                    getOptionLabel={(option) => option.name}
                    onInputChange={(event, newInputValue) => handleStudentFilter(newInputValue)}
                    renderInput={(params) => <TextField {...params} label="Ученик" />}
                  />
                  <TextField
                    margin="dense"
                    label="Преподаватель"
                    name="teacher"
                    fullWidth
                    required
                    value={lessonData.teacher}
                    onChange={handleLessonChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setLessonDialogOpen(false)}>Отмена</Button>
                  <Button onClick={handleAddLesson}>Добавить</Button>
                </DialogActions>
              </Dialog>
            </Paper>
          )}
          {selectedComponent === 'schedule' && (
            <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
              <Schedule />
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

export default AdminDashboard;