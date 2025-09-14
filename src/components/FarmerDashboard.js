import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import FarmerImageClassifier from './FarmerImageClassifier';
import FarmerNetwork from './FarmerNetwork';
import FarmerComplianceTracker from './FarmerComplianceTracker';
import FarmerTrainingModules from './FarmerTrainingModules';

const FarmerDashboard = () => {
  const [farmHealth, setFarmHealth] = useState('Good');
  const [weatherAlerts, setWeatherAlerts] = useState(['No alerts']);
  const [complianceDeadlines, setComplianceDeadlines] = useState(['No deadlines']);
  const [notifications, setNotifications] = useState(['No notifications']);

  useEffect(() => {
    // Fetch data from Firestore (replace placeholder data)
  }, []);

  return (
    <div>
      <h1>Farmer Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Farm Health Status</Typography>
              <Typography>{farmHealth}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Weather Alerts</Typography>
              <List>
                {weatherAlerts.map((alert, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={alert} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upcoming Compliance Deadlines</Typography>
              <List>
                {complianceDeadlines.map((deadline, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={deadline} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Notifications</Typography>
              <List>
                {notifications.map((notification, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={notification} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <FarmerImageClassifier />
      <FarmerNetwork />
      <FarmerComplianceTracker />
      <FarmerTrainingModules />
    </div>
  );
};
export default FarmerDashboard;
