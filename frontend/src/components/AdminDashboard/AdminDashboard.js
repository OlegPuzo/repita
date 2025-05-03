import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
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
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import UserTabs from './UserTabs';
import TeachersTable from './Tables/TeachersTable';
import StudentsTable from './Tables/StudentsTable';
import RatesTable from './Tables/RatesTable';
import AddUserDialog from './Dialogs/AddUserDialog';
import AddLessonDialog from './Dialogs/AddLessonDialog';
import AddRateDialog from './Dialogs/AddRateDialog'; // ✅ Новый диалог
import Schedule from '../Schedule';
import Chat from '../Chat';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [managers, setManagers] = useState([]);
  const [rates, setRates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
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
  const [rateData, setRateData] = useState({ title: '', cost: '', payment_method: '' }); // ✅ Новое состояние
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('admin');
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const apiUrl = '/api/admin';
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
    } catch (err) {
      setError('Ошибка загрузки данных');
      console.error('Ошибка получения данных:', err.message || err);
    } finally {
      setLoading(false);
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
    if (type === 'rate') {
      setRateData({ title: '', cost: '', payment_method: '' });
    } else {
      setFormData(
        type === 'teacher'
          ? { first_name: '', last_name: '', phone: '', email: '', password: '', rate_id: '' }
          : type === 'student'
          ? { first_name: '', last_name: '', phone: '', email: '', password: '', teacher_id: '' }
          : { first_name: '', last_name: '', phone: '', email: '', password: '' }
      );
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailError(!isValidEmail && value !== '');
    }
    if (name === 'phone') {
      const isValidPhone = /^\d{10,15}$/.test(value);
      setPhoneError(!isValidPhone && value !== '');
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleRateChange = (e) => {
    const { name, value } = e.target;
    setRateData({ ...rateData, [name]: value });
  };

  const handleRateSubmit = async () => {
    try {
      await axios.post('/api/admin/rates', rateData);
      await fetchData();
      handleCloseDialog();
    } catch (err) {
      console.error('Ошибка добавления ставки:', err.message || err);
    }
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

  const handleAddLesson = async () => {
    try {
      await axios.post('/api/lessons/create', lessonData);
      setLessonDialogOpen(false);
    } catch (err) {
      console.error('Ошибка добавления урока:', err.message || err);
    }
  };

  const renderTable = () => {
    switch (tabIndex) {
      case 0:
        return(
          <Box>
            <Button variant="contained" onClick={() => handleOpenDialog('teacher')}>
                Добавить учителя
              </Button>
              <TeachersTable teachers={teachers} rates={rates} />;
          </Box>
          );
      case 1:
        return(
          <Box>
            <Button variant="contained" onClick={() => handleOpenDialog('student')}>
                Добавить ученика
              </Button>
              <StudentsTable students={students} />;
          </Box>
          );
      case 2:
        return (
          <Box>
            <Button variant="contained" color="secondary" onClick={() => handleOpenDialog('rate')}>
              Добавить ставку
            </Button>
            <RatesTable rates={rates} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
        <MenuIcon />
      </IconButton>
      <Sidebar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} setSelectedComponent={setSelectedComponent} />
      <Typography variant="h3" align="center" gutterBottom>
        Личный кабинет
      </Typography>
      <Grid container spacing={2} style={{ height: 'calc(100vh - 100px)', marginTop: '20px' }}>
        <Grid item xs={12}>
          {selectedComponent === 'admin' && (
            <Paper style={{ height: '100%', padding: 16, overflow: 'auto' }}>
              <Typography variant="h4" gutterBottom>
                Административная панель
              </Typography>
              <UserTabs tabIndex={tabIndex} onTabChange={handleTabChange} />
              <Box sx={{ mt: 2 }}>
                {renderTable()}
              </Box>
              {/* Диалоги */}
              {dialogType === 'rate' ? (
                <AddRateDialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  formData={rateData}
                  onFormChange={handleRateChange}
                  onSubmit={handleRateSubmit}
                />
              ) : (
                <AddUserDialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  dialogType={dialogType}
                  formData={formData}
                  onFormChange={handleFormChange}
                  emailError={emailError}
                  phoneError={phoneError}
                />
              )}
              <AddLessonDialog
                open={lessonDialogOpen}
                onClose={() => setLessonDialogOpen(false)}
                lessonData={lessonData}
                onLessonChange={handleLessonChange}
                filteredStudents={filteredStudents}
                onStudentFilter={handleStudentFilter}
                onAddLesson={handleAddLesson}
              />
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