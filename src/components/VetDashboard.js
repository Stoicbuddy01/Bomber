import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, List, ListItemText } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import RiskAssessmentTool from './RiskAssessmentTool';
import ProtectionHub from './ProtectionHub';
import AnimalHealthPredictor from './AnimalHealthPredictor';
import DiseaseImageClassifier from './DiseaseImageClassifier';

const VetDashboard = () => {
  const [farmsAssessed, setFarmsAssessed] = useState(0);
  const [riskAssessmentsCompleted, setRiskAssessmentsCompleted] = useState(0);
  const [diseaseCasesIdentified, setDiseaseCasesIdentified] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [recentCases, setRecentCases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch personal performance metrics
      // Example: Farms assessed by the vet
      const farmsAssessedQuery = query(
        collection(db, 'farms'),
        where('assessedBy', '==', 'currentVetId') // Replace 'currentVetId' with the actual vet ID
      );
      const farmsAssessedSnapshot = await getDocs(farmsAssessedQuery);
      setFarmsAssessed(farmsAssessedSnapshot.size);

      // Example: Risk assessments completed by the vet
      const riskAssessmentsQuery = query(
        collection(db, 'riskAssessments'),
        where('completedBy', '==', 'currentVetId') // Replace 'currentVetId' with the actual vet ID
      );
      const riskAssessmentsSnapshot = await getDocs(riskAssessmentsQuery);
      setRiskAssessmentsCompleted(riskAssessmentsSnapshot.size);

      // Example: Disease cases identified by the vet
      const diseaseCasesQuery = query(
        collection(db, 'diseaseCases'),
        where('identifiedBy', '==', 'currentVetId') // Replace 'currentVetId' with the actual vet ID
      );
      const diseaseCasesSnapshot = await getDocs(diseaseCasesQuery);
      setDiseaseCasesIdentified(diseaseCasesSnapshot.size);

      // Example: Calculate success rate (replace with actual logic)
      setSuccessRate(85);

      // Fetch appointments (example: appointments for the next 7 days)
      const appointmentsData = [
        { id: 'appt1', farmName: 'Farm A', date: '2025-09-15', time: '10:00 AM' },
        { id: 'appt2', farmName: 'Farm B', date: '2025-09-16', time: '02:00 PM' },
      ];
      setAppointments(appointmentsData);

      // Fetch task list (example: tasks assigned to the vet)
      const taskListData = [
        { id: 'task1', description: 'Review biosecurity protocols for Farm C', priority: 'High' },
        { id: 'task2', description: 'Schedule follow-up visit for Farm D', priority: 'Medium' },
      ];
      setTaskList(taskListData);

      // Fetch recent cases (example: recent cases reported by the vet)
      const recentCasesData = [
        { id: 'case1', farmName: 'Farm E', disease: 'Avian Influenza', date: '2025-09-12' },
        { id: 'case2', farmName: 'Farm F', disease: 'Swine Fever', date: '2025-09-11' },
      ];
      setRecentCases(recentCasesData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Veterinarian Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Farms Assessed</Typography>
              <Typography variant="h4">{farmsAssessed}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Risk Assessments Completed</Typography>
              <Typography variant="h4">{riskAssessmentsCompleted}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Disease Cases Identified</Typography>
              <Typography variant="h4">{diseaseCasesIdentified}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Success Rate</Typography>
              <Typography variant="h4">{successRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Appointments</Typography>
              <List>
                {appointments.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemText
                      primary={appointment.farmName}
                      secondary={`${appointment.date} - ${appointment.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Task List</Typography>
              <List>
                {taskList.map((task) => (
                  <ListItem key={task.id}>
                    <ListItemText
                      primary={task.description}
                      secondary={`Priority: ${task.priority}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Cases</Typography>
              <List>
                {recentCases.map((recentCase) => (
                  <ListItem key={recentCase.id}>
                    <ListItemText
                      primary={recentCase.farmName}
                      secondary={`${recentCase.disease} - ${recentCase.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <RiskAssessmentTool />
      <ProtectionHub />
      <AnimalHealthPredictor />
      <DiseaseImageClassifier />
    </div>
  );
};

export default VetDashboard;
