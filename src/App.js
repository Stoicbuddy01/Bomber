import React, { useState, useEffect } from 'react';
import api, { setAuthToken } from './api';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './theme';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import VetDashboard from './components/VetDashboard';
import FarmerDashboard from './components/FarmerDashboard';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const App = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    const fetchUser = async () => {
      try {
        const response = await api.get('/me');
        setUser(response.data);
        setUserRole(response.data.userType);
      } catch (error) {
        console.error(error);
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={i18n.language}
            label="Language"
            onChange={handleLanguageChange}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
          </Select>
        </FormControl>
        {user ? (
          userRole === 'admin' ? (
            <AdminDashboard />
          ) : userRole === 'vet' ? (
            <VetDashboard />
          ) : (
            <FarmerDashboard />
          )
        ) : (
          <Auth />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
