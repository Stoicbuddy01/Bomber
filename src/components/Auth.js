import React, { useState } from 'react';
import api, { setAuthToken } from '../api';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [ministryId, setMinistryId] = useState('');
  const [designation, setDesignation] = useState('');
  const [jurisdictionArea, setJurisdictionArea] = useState('');
  const [veterinaryLicenseNumber, setVeterinaryLicenseNumber] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [practiceArea, setPracticeArea] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [livestockType, setLivestockType] = useState('pig');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegistering) {
        response = await api.post('/register', {
          email,
          password,
          userType,
          fullName,
          mobileNumber,
          ...(userType === 'admin' && { ministryId, designation, jurisdictionArea }),
          ...(userType === 'vet' && { veterinaryLicenseNumber, specialization, practiceArea }),
          ...(userType === 'farmer' && { farmName, farmSize, livestockType, location }),
        });
      } else {
        response = await api.post('/login', {
          email,
          password,
        });
      }

      const { token } = response.data;
      setAuthToken(token);
      // Store the token in local storage or a cookie
      localStorage.setItem('token', token);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {isRegistering && (
        <>
          <TextField label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <TextField label="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
          <FormControl fullWidth>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              value={userType}
              label="User Type"
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="admin">Ministry Admin</MenuItem>
              <MenuItem value="vet">Veterinarian</MenuItem>
              <MenuItem value="farmer">Farmer</MenuItem>
            </Select>
          </FormControl>
          {userType === 'admin' && (
            <>
              <TextField label="Ministry ID" value={ministryId} onChange={(e) => setMinistryId(e.target.value)} required={isRegistering && userType === 'admin'} />
              <TextField label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required={isRegistering && userType === 'admin'} />
              <TextField label="Jurisdiction Area" value={jurisdictionArea} onChange={(e) => setJurisdictionArea(e.target.value)} required={isRegistering && userType === 'admin'} />
            </>
          )}
          {userType === 'vet' && (
            <>
              <TextField label="Veterinary License Number" value={veterinaryLicenseNumber} onChange={(e) => setVeterinaryLicenseNumber(e.target.value)} required={isRegistering && userType === 'vet'} />
              <TextField label="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required={isRegistering && userType === 'vet'} />
              <TextField label="Practice Area" value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)} required={isRegistering && userType === 'vet'} />
            </>
          )}
          {userType === 'farmer' && (
            <>
              <TextField label="Farm Name" value={farmName} onChange={(e) => setFarmName(e.target.value)} required={isRegistering && userType === 'farmer'} />
              <TextField label="Farm Size" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} required={isRegistering && userType === 'farmer'} />
              <FormControl fullWidth>
                <InputLabel id="livestock-type-label">Livestock Type</InputLabel>
                <Select
                  labelId="livestock-type-label"
                  id="livestock-type"
                  value={livestockType}
                  label="Livestock Type"
                  onChange={(e) => setLivestockType(e.target.value)}
                >
                  <MenuItem value="pig">Pig</MenuItem>
                  <MenuItem value="poultry">Poultry</MenuItem>
                  <MenuItem value="both">Both</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required={isRegistering && userType === 'farmer'} />
            </>
          )}
        </>
      )}
      <Button type="submit" variant="contained">{isRegistering ? 'Register' : 'Login'}</Button>
      <Button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </Button>
    </form>
  );
};

export default Auth;
