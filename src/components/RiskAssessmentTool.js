import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const RiskAssessmentTool = () => {
  const [farmName, setFarmName] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [livestockType, setLivestockType] = useState('pig');
  const [biosecurityPractices, setBiosecurityPractices] = useState('');
  const [environmentalRiskFactors, setEnvironmentalRiskFactors] = useState('');
  const [historicalDiseaseData, setHistoricalDiseaseData] = useState('');
  const [riskScore, setRiskScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [historicalAssessments, setHistoricalAssessments] = useState([]);

  useEffect(() => {
    const fetchHistoricalAssessments = async () => {
      // Fetch historical assessments from Firestore
      // Replace 'farmName' with the actual farm name
      const historicalAssessmentsQuery = query(
        collection(db, 'riskAssessments'),
        where('farmName', '==', farmName)
      );
      const historicalAssessmentsSnapshot = await getDocs(historicalAssessmentsQuery);
      const historicalAssessmentsList = historicalAssessmentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistoricalAssessments(historicalAssessmentsList);
    };

    if (farmName) {
      fetchHistoricalAssessments();
    }
  }, [farmName]);

  const calculateRiskScore = () => {
    // Implement risk scoring algorithm here
    // This is a placeholder, replace with actual logic
    let score = 0;
    if (farmName) score += 10;
    if (farmSize) score += 5;
    if (livestockType) score += 5;
    if (biosecurityPractices) score += 15;
    if (environmentalRiskFactors) score += 10;
    if (historicalDiseaseData) score += 20;
    setRiskScore(score);
  };

  const generateRecommendations = () => {
    const newRecommendations = [];
    if (riskScore < 30) {
      newRecommendations.push('Implement basic biosecurity measures.');
    } else if (riskScore < 60) {
      newRecommendations.push('Improve biosecurity practices and monitor livestock health closely.');
    } else {
      newRecommendations.push('Implement strict biosecurity protocols and consult with a veterinarian immediately.');
      newRecommendations.push('Consider implementing isolation measures for affected livestock.');
    }
    setRecommendations(newRecommendations);
  };

  const handleSubmit = () => {
    calculateRiskScore();
    generateRecommendations();
    alert('Risk assessment submitted!');
  };

  const data = [{ name: 'Risk Score', value: riskScore }];

  return (
    <div>
      <h2>Risk Assessment Tool</h2>
      <Card>
        <CardContent>
          <Typography variant="h6">Farm Information</Typography>
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
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Biosecurity Practices</Typography>
          <TextField
            label="Biosecurity Practices"
            fullWidth
            multiline
            rows={4}
            value={biosecurityPractices}
            onChange={(e) => setBiosecurityPractices(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Environmental Risk Factors</Typography>
          <TextField
            label="Environmental Risk Factors"
            fullWidth
            multiline
            rows={4}
            value={environmentalRiskFactors}
            onChange={(e) => setEnvironmentalRiskFactors(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Historical Disease Data</Typography>
          <TextField
            label="Historical Disease Data"
            fullWidth
            multiline
            rows={4}
            value={historicalDiseaseData}
            onChange={(e) => setHistoricalDiseaseData(e.target.value)}
          />
        </CardContent>
      </Card>

      <Button variant="contained" onClick={handleSubmit}>Submit Risk Assessment</Button>

      <Card>
        <CardContent>
          <Typography variant="h6">Risk Score</Typography>
          <BarChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]}/>
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
          <Typography variant="body2">Risk Score: {riskScore}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Recommendations</Typography>
          <List>
            {recommendations.map((recommendation, index) => (
              <ListItem key={index}>
                <ListItemText primary={recommendation} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <h3>Historical Assessments</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="historical assessments table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Risk Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalAssessments.map((assessment) => (
              <TableRow
                key={assessment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{assessment.date}</TableCell>
                <TableCell>{assessment.riskScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RiskAssessmentTool;
