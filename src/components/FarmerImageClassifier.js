import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const FarmerImageClassifier = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [classificationResults, setClassificationResults] = useState('');
  const [severityIndicator, setSeverityIndicator] = useState('Low');
  const [actionSteps, setActionSteps] = useState(['Isolate the affected animal(s)', 'Contact your veterinarian immediately']);

  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = () => {
    // Simulate ML model integration
    const predictedDisease = 'Avian Influenza';
    setClassificationResults(predictedDisease);
    alert('Classifying image...');
  };
  const handleRequestConsultation = () => {
    alert('Requesting veterinary consultation...');
  };

  return (
    <div>
      <h2>Farmer Image Classifier</h2>
      <Card>
        <CardContent>
          <Typography variant="h6">Step 1: Take a clear photo of the affected area</Typography>
          <Typography variant="body2">Make sure the image is well-lit and in focus.</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item><IconButton color="primary" aria-label="upload picture" component="label"><input hidden accept="image/*" type="file" onChange={handleImageChange} /><PhotoCamera /></IconButton></Grid>
            <Grid item>{selectedImage && (<img src={selectedImage} alt="Uploaded Image" style={{ width: 200, height: 200, objectFit: 'cover' }} />)}</Grid>
          </Grid>
          <Button variant="contained" onClick={handleSubmit} disabled={!selectedImage}>Classify Image</Button>
          {classificationResults && (
            <Card>
              <CardContent>
                <Typography variant="h6">Classification Results</Typography>
                <Typography>Possible Disease: {classificationResults}</Typography>
                <Typography>Severity: {severityIndicator}</Typography>
                <Typography variant="h6">Immediate Action Steps</Typography>
                <List>
                  {actionSteps.map((step, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={step} />
                    </ListItem>
                  ))}
                </List>
                <Button variant="contained" onClick={handleRequestConsultation}>Request Veterinary Consultation</Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerImageClassifier;
