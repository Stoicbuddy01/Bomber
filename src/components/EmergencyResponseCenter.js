import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const EmergencyResponseCenter = () => {
  const [sosRequests, setSosRequests] = useState([]);
  const [availableResources, setAvailableResources] = useState([]);
  const [responseTeamMembers, setResponseTeamMembers] = useState([]);
  const [emergencyProtocols, setEmergencyProtocols] = useState([]);
  const [emergencyResponseLogs, setEmergencyResponseLogs] = useState([]);

  useEffect(() => {
    const fetchSosRequests = async () => {
      const sosRequestsSnapshot = await getDocs(collection(db, 'sosRequests'));
      const sosRequestsList = sosRequestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSosRequests(sosRequestsList);
    };

    const fetchAvailableResources = async () => {
      const availableResourcesSnapshot = await getDocs(collection(db, 'availableResources'));
      const availableResourcesList = availableResourcesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableResources(availableResourcesList);
    };

    const fetchResponseTeamMembers = async () => {
      const responseTeamMembersSnapshot = await getDocs(collection(db, 'responseTeamMembers'));
      const responseTeamMembersList = responseTeamMembersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResponseTeamMembers(responseTeamMembersList);
    };

    const fetchEmergencyProtocols = async () => {
      const emergencyProtocolsSnapshot = await getDocs(collection(db, 'emergencyProtocols'));
      const emergencyProtocolsList = emergencyProtocolsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmergencyProtocols(emergencyProtocolsList);
    };

    const fetchEmergencyResponseLogs = async () => {
      const emergencyResponseLogsSnapshot = await getDocs(collection(db, 'emergencyResponseLogs'));
      const emergencyResponseLogsList = emergencyResponseLogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmergencyResponseLogs(emergencyResponseLogsList);
    };

    fetchSosRequests();
    fetchAvailableResources();
    fetchResponseTeamMembers();
    fetchEmergencyProtocols();
    fetchEmergencyResponseLogs();
  }, []);

  return (
    <div>
      <h2>Emergency Response Center</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Emergency Hotline Numbers</Typography>
              <Typography variant="body1">National: 100</Typography>
              <Typography variant="body1">State: 101</Typography>
              <Typography variant="body1">Local: 102</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Quick Action Buttons</Typography>
              <Button variant="contained" color="error">Declare Alert (Region 1)</Button>
              <Button variant="contained" color="error">Declare Alert (Region 2)</Button>
              <Button variant="contained" color="error">Declare Alert (Region 3)</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <h3>SOS Requests</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sos requests table">
          <TableHead>
            <TableRow>
              <TableCell>Farm Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sosRequests.map((request) => (
              <TableRow
                key={request.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {request.farmName}
                </TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell>{request.description}</TableCell>
                <TableCell>
                  <Button variant="contained">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Available Resources</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="available resources table">
          <TableHead>
            <TableRow>
              <TableCell>Resource Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableResources.map((resource) => (
              <TableRow
                key={resource.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {resource.resourceName}
                </TableCell>
                <TableCell>{resource.quantity}</TableCell>
                <TableCell>
                  <Button variant="contained">Assign</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Response Team Contact Directory</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="response team members table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseTeamMembers.map((member) => (
              <TableRow
                key={member.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {member.name}
                </TableCell>
                <TableCell>{member.contactNumber}</TableCell>
                <TableCell>{member.availability ? 'Available' : 'Not Available'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Emergency Protocols Library</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="emergency protocols table">
          <TableHead>
            <TableRow>
              <TableCell>Protocol Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emergencyProtocols.map((protocol) => (
              <TableRow
                key={protocol.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {protocol.protocolName}
                </TableCell>
                <TableCell>{protocol.description}</TableCell>
                <TableCell>
                  <Button variant="contained">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Historical Emergency Response Log</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="emergency response logs table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emergencyResponseLogs.map((log) => (
              <TableRow
                key={log.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {log.date}
                </TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>
                  <Button variant="contained">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmergencyResponseCenter;
