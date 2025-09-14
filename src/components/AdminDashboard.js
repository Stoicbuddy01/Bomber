import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import EmergencyResponseCenter from './EmergencyResponseCenter';
import ComplianceTracking from './ComplianceTracking';
import AdminNotificationManagement from './AdminNotificationManagement';

const AdminDashboard = () => {
  const [totalFarms, setTotalFarms] = useState(0);
  const [farmsInspected, setFarmsInspected] = useState(0);
  const [activeOutbreaks, setActiveOutbreaks] = useState(0);
  const [complianceRate, setComplianceRate] = useState(0);
  const [diseaseDistribution, setDiseaseDistribution] = useState([]);
  const [monthlyFarmVisits, setMonthlyFarmVisits] = useState([]);
  const [diseaseTrends, setDiseaseTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch total farms
      const farmsSnapshot = await getDocs(collection(db, 'users'));
      setTotalFarms(farmsSnapshot.size);

      // Fetch farms inspected (example: last month)
      const inspectedQuery = query(
        collection(db, 'farms'),
        where('lastInspected', '>=', new Date(new Date().setDate(new Date().getDate() - 30)))
      );
      const inspectedSnapshot = await getDocs(inspectedQuery);
      setFarmsInspected(inspectedSnapshot.size);

      // Fetch active disease outbreaks (example: status is active)
      const outbreaksQuery = query(collection(db, 'outbreaks'), where('status', '==', 'active'));
      const outbreaksSnapshot = await getDocs(outbreaksQuery);
      setActiveOutbreaks(outbreaksSnapshot.size);

      // Calculate compliance rate (example: farms with compliance documents)
      const complianceQuery = query(collection(db, 'farms'), where('complianceDocuments', '!=', null));
      const complianceSnapshot = await getDocs(complianceQuery);
      setComplianceRate((complianceSnapshot.size / farmsSnapshot.size) * 100);

      // Fetch disease distribution data (example: disease type and count)
      const diseaseData = [
        { name: 'Avian Influenza', value: 30 },
        { name: 'Swine Fever', value: 40 },
        { name: 'Foot and Mouth Disease', value: 20 },
        { name: 'Other', value: 10 },
      ];
      setDiseaseDistribution(diseaseData);

      // Fetch monthly farm visits data (example: month and visit count)
      const visitData = [
        { month: 'Jan', visits: 20 },
        { month: 'Feb', visits: 30 },
        { month: 'Mar', visits: 40 },
        { month: 'Apr', visits: 35 },
        { month: 'May', visits: 45 },
      ];
      setMonthlyFarmVisits(visitData);

      // Fetch disease trends data (example: month and disease cases)
      const trendData = [
        { month: 'Jan', cases: 10 },
        { month: 'Feb', cases: 15 },
        { month: 'Mar', cases: 12 },
        { month: 'Apr', cases: 18 },
        { month: 'May', cases: 20 },
      ];
      setDiseaseTrends(trendData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Registered Farms</Typography>
              <Typography variant="h4">{totalFarms}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Farms Inspected (Monthly)</Typography>
              <Typography variant="h4">{farmsInspected}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Disease Outbreaks</Typography>
              <Typography variant="h4">{activeOutbreaks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Compliance Rate</Typography>
              <Typography variant="h4">{complianceRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Disease Distribution</Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={diseaseDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly Farm Visits</Typography>
              <BarChart width={400} height={300} data={monthlyFarmVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="visits" fill="#82ca9d" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Disease Trends Over Time</Typography>
              <LineChart width={800} height={300} data={diseaseTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="cases" stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <EmergencyResponseCenter />
      <ComplianceTracking />
      <AdminNotificationManagement />
    </div>
  );
};

export default AdminDashboard;
