import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Chip, Calendar, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isPast } from 'date-fns';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const FarmerComplianceTracker = () => {
  const [documentType, setDocumentType] = useState('');
  const [expirationDate, setExpirationDate] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('pending'); // Initial status
  const [expiringDocuments, setExpiringDocuments] = useState([]);
  const [openGuide, setOpenGuide] = useState(null);
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Template 1', description: 'Description 1', url: '#' },
    { id: 2, name: 'Template 2', description: 'Description 2', url: '#' },
  ]);

  useEffect(() => {
    // Simulate fetching documents from Firestore
    const documents = [
      { id: 1, type: 'Certification', expirationDate: new Date('2025-10-01'), status: 'approved' },
      { id: 2, type: 'Inspection Report', expirationDate: new Date('2025-09-25'), status: 'approved' },
    ];

    // Check for expiring documents
    const expiring = documents.filter(doc => isPast(doc.expirationDate));
    setExpiringDocuments(expiring);
  }, []);

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleExpirationDateChange = (date) => {
    setExpirationDate(date);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle file upload and data submission to Firestore
    alert('File uploaded!');
    setStatus('pending'); // Set status to pending after submission
  };

  const getStatusChip = () => {
    switch (status) {
      case 'pending':
        return <Chip label="Pending" color="warning" />; // Yellow
      case 'approved':
        return <Chip label="Approved" color="success" />; // Green
      case 'rejected':
        return <Chip label="Rejected" color="error" />; // Red
      case 'expired':
        return <Chip label="Expired" color="default" />; // Gray
      default:
        return <Chip label="Unknown" />; // Default
    }
  };

  const handleGuideClick = (guideId) => {
    setOpenGuide(openGuide === guideId ? null : guideId);
  };

  // Simulated guides data
  const guides = [
    { id: 1, title: 'Certification Guide', steps: ['Step 1: Fill out the application form', 'Step 2: Submit required documents', 'Step 3: Await approval'] },
    { id: 2, title: 'Inspection Report Guide', steps: ['Step 1: Schedule an inspection', 'Step 2: Prepare your farm for inspection', 'Step 3: Receive the inspection report'] },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Upload Compliance Documents</Typography>
        <FormControl fullWidth>
          <InputLabel id="document-type-label">Document Type</InputLabel>
          <Select
            labelId="document-type-label"
            id="document-type"
            value={documentType}
            label="Document Type"
            onChange={handleDocumentTypeChange}
          >
            <MenuItem value="certification">Certification</MenuItem>
            <MenuItem value="inspectionReport">Inspection Report</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Expiration Date"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            renderInput={(params) => <TextField {...params} fullWidth InputLabelProps={{ shrink: true }} />}
          />
        </LocalizationProvider>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {file && <Typography>Selected file: {file.name}</Typography>}
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        <Typography>Status: {getStatusChip()}</Typography>

        {expiringDocuments.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" color="error">Expiring Documents</Typography>
              <List>
                {expiringDocuments.map(doc => (
                  <ListItem key={doc.id}>
                    <ListItemText primary={doc.type} secondary={`Expires on: ${doc.expirationDate.toLocaleDateString()}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        <Typography variant="h6">Compliance Guides</Typography>
        <List>
          {guides.map(guide => (
            <ListItem key={guide.id} button onClick={() => handleGuideClick(guide.id)}>
              <ListItemText primary={guide.title} />
              {openGuide === guide.id ? <ExpandLess /> : <ExpandMore />}
              <Collapse in={openGuide === guide.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {guide.steps.map((step, index) => (
                    <ListItem key={index} sx={{ pl: 4 }}>
                      <ListItemText primary={step} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6">Document Templates</Typography>
        <List>
          {templates.map(template => (
            <ListItem key={template.id} component="a" href={template.url} target="_blank">
              <ListItemText primary={template.name} secondary={template.description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FarmerComplianceTracker;
