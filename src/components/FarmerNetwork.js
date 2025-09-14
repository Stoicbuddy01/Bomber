import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const FarmerNetwork = () => {
  const [farmName, setFarmName] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [livestockNumbers, setLivestockNumbers] = useState('');
  const [productionType, setProductionType] = useState('');
  const [photoGallery, setPhotoGallery] = useState('');
  const [location, setLocation] = useState('');
  const [nearbyFarms, setNearbyFarms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [connectionRequests, setConnectionRequests] = useState([]);

  useEffect(() => {
    const fetchNearbyFarms = async () => {
      // Fetch nearby farms from Firestore (replace placeholder data)
      const farmsSnapshot = await getDocs(collection(db, 'farms'));
      const farmsList = farmsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNearbyFarms(farmsList);
    };

    // Fetch connection requests (replace placeholder data)
    const fetchConnectionRequests = async () => {
      const requestsSnapshot = await getDocs(collection(db, 'connectionRequests'));
      const requestsList = requestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConnectionRequests(requestsList);
    };

    fetchNearbyFarms();
    fetchConnectionRequests();
  }, []);

  const handleSubmit = () => {
    // Implement farm profile creation/management logic here
    alert('Farm profile saved!');
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleAcceptRequest = (requestId) => {
    // Implement accept request logic here
    alert('Request accepted!');
  };

  const handleRejectRequest = (requestId) => {
    // Implement reject request logic here
    alert('Request rejected!');
  };

  const filteredFarms = nearbyFarms.filter(farm => {
    if (filter === 'all') return true;
    return farm.productionType === filter;
  });

  return (
    <div>
      <h2>Farmer Network</h2>
      <Card>
        <CardContent>
          <Typography variant="h6">Create/Manage Farm Profile</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Farm Name"
                fullWidth
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Farm Size"
                fullWidth
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Livestock Numbers"
                fullWidth
                value={livestockNumbers}
                onChange={(e) => setLivestockNumbers(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Production Type"
                fullWidth
                value={productionType}
                onChange={(e) => setProductionType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Photo Gallery (URLs, comma-separated)"
                fullWidth
                value={photoGallery}
                onChange={(e) => setPhotoGallery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location (e.g., City, State)"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSubmit}>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Nearby Farms</Typography>
          <FormControl fullWidth>
            <InputLabel id="filter-label">Filter by Production Type</InputLabel>
            <Select
              labelId="filter-label"
              id="filter"
              value={filter}
              label="Filter by Production Type"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pig">Pig</MenuItem>
              <MenuItem value="poultry">Poultry</MenuItem>
            </Select>
          </FormControl>
          <List>
            {filteredFarms.map((farm) => (
              <ListItem key={farm.id}>
                <ListItemText primary={farm.farmName} secondary={`Location: ${farm.location}, Production Type: ${farm.productionType}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Connection Requests</Typography>
          <List>
            {connectionRequests.map((request) => (
              <ListItem key={request.id}>
                <ListItemText primary={request.farmName} secondary={`Message: ${request.message}`} />
                <Button onClick={() => handleAcceptRequest(request.id)}>Accept</Button>
                <Button onClick={() => handleRejectRequest(request.id)}>Reject</Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerNetwork;
