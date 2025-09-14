import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, TextField, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AdminNotificationManagement = () => {
  const [targetAudience, setTargetAudience] = useState('all');
  const [priorityLevel, setPriorityLevel] = useState('normal');
  const [alertContent, setAlertContent] = useState(EditorState.createEmpty());
  const [alertTemplates, setAlertTemplates] = useState([
    { id: 'template1', name: 'Disease Outbreak Alert', content: 'A new disease outbreak has been reported in [region]. Please take necessary precautions.' },
    { id: 'template2', name: 'Compliance Reminder', content: 'Your compliance documents are due on [date]. Please submit them before the deadline.' },
    { id: 'template3', name: 'Weather Alert', content: 'Severe weather conditions are expected in [region]. Please take necessary precautions to protect your livestock.' },
  ]);
  const [alertMetrics, setAlertMetrics] = useState([
    { id: 'alert1', name: 'Disease Outbreak Alert', deliveryRate: 95, openRate: 80 },
    { id: 'alert2', name: 'Compliance Reminder', deliveryRate: 90, openRate: 75 },
    { id: 'alert3', name: 'Weather Alert', deliveryRate: 98, openRate: 85 },
  ]);
  const [alertArchive, setAlertArchive] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlertArchive = async () => {
      const alertArchiveSnapshot = await getDocs(collection(db, 'alerts'));
      const alertArchiveList = alertArchiveSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlertArchive(alertArchiveList);
    };

    fetchAlertArchive();
  }, []);

  const handleCreateAlert = async () => {
    // Save alert to Firestore
    try {
      await addDoc(collection(db, 'alerts'), {
        targetAudience,
        priorityLevel,
        content: alertContent.getCurrentContent().getPlainText(),
        timestamp: new Date(),
      });
      alert('Alert created successfully!');
    } catch (error) {
      console.error("Error creating alert: ", error);
      alert('Failed to create alert.');
    }
  };

  const handleEditorStateChange = (editorState) => {
    setAlertContent(editorState);
  };

  const handleTemplateSelect = (templateContent) => {
    setAlertContent(EditorState.createWithContent(templateContent));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlertArchive = alertArchive.filter(alert =>
    alert.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Admin Notification Management</h2>
      <h3>Create Alert</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Target Audience</Typography>
              <FormControl fullWidth>
                <InputLabel id="target-audience-label">Target Audience</InputLabel>
                <Select
                  labelId="target-audience-label"
                  id="target-audience"
                  value={targetAudience}
                  label="Target Audience"
                  onChange={(e) => setTargetAudience(e.target.value)}
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="farmers">Farmers</MenuItem>
                  <MenuItem value="vets">Veterinarians</MenuItem>
                  <MenuItem value="admins">Ministry Admins</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Priority Level</Typography>
              <FormControl fullWidth>
                <InputLabel id="priority-level-label">Priority Level</InputLabel>
                <Select
                  labelId="priority-level-label"
                  id="priority-level"
                  value={priorityLevel}
                  label="Priority Level"
                  onChange={(e) => setPriorityLevel(e.target.value)}
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Alert Content</Typography>
              <Editor
                editorState={alertContent}
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbarClassName="toolbarClassName"
                onEditorStateChange={handleEditorStateChange}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Alert Templates</Typography>
          <List>
            {alertTemplates.map((template) => (
              <ListItem button key={template.id} onClick={() => handleTemplateSelect(template.content)}>
                <ListItemText primary={template.name} secondary={template.content} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <h3>Alert Performance Metrics</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="alert metrics table">
            <TableHead>
              <TableRow>
                <TableCell>Alert Name</TableCell>
                <TableCell>Delivery Rate</TableCell>
                <TableCell>Open Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alertMetrics.map((metric) => (
                <TableRow
                  key={metric.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{metric.name}</TableCell>
                  <TableCell>{metric.deliveryRate}%</TableCell>
                  <TableCell>{metric.openRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Alert Archive</h3>
        <TextField
          label="Search Alerts"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="alert archive table">
            <TableHead>
              <TableRow>
                <TableCell>Alert Name</TableCell>
                <TableCell>Target Audience</TableCell>
                <TableCell>Priority Level</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlertArchive.map((alert) => (
                <TableRow
                  key={alert.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{alert.name}</TableCell>
                  <TableCell>{alert.targetAudience}</TableCell>
                  <TableCell>{alert.priorityLevel}</TableCell>
                  <TableCell>{alert.content}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleCreateAlert}>Create Alert</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminNotificationManagement;
