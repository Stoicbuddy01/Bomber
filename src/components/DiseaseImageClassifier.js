import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, IconButton,ImageList, ImageListItem } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const DiseaseImageClassifier = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [classificationResults, setClassificationResults] = useState('');
  const [confidencePercentage, setConfidencePercentage] = useState('');
  const [referenceImages, setReferenceImages] = useState([
    { id: 'ref1', img: 'https://via.placeholder.com/200x200', title: 'Avian Influenza 1' },
    { id: 'ref2', img: 'https://via.placeholder.com/200x200', title: 'Avian Influenza 2' },
    { id: 'ref3', img: 'https://via.placeholder.com/200x200', title: 'Avian Influenza 3' },
  ]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = () => {
    // Implement ML model integration here
    // Replace with actual ML model API call
    const predictedDisease = 'Avian Influenza';
    const confidence = 80;
    setClassificationResults(predictedDisease);
    setConfidencePercentage(confidence);
    alert('Classifying image...');
  };

  const handleRequestExpertVerification = () => {
    // Implement expert verification request logic here
    alert('Request sent for expert verification.');
  };

  return (
    <div>
      <h2>Disease Image Classifier</h2>
      <Card>
        <CardContent>
          <Typography variant="h6">Upload Image</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                <PhotoCamera />
              </IconButton>
            </Grid>
            <Grid item>
              {selectedImage && (
                <img src={selectedImage} alt="Uploaded Image" style={{ width: 200, height: 200, objectFit: 'cover' }} />
              )}
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSubmit} disabled={!selectedImage}>Classify Image</Button>

          {classificationResults && (
            <Card>
              <CardContent>
                <Typography variant="h6">Classification Results</Typography>
                <Typography>Disease: {classificationResults}</Typography>
                <Typography>Confidence: {confidencePercentage}%</Typography>
                <Button variant="outlined" onClick={handleRequestExpertVerification}>Request Expert Verification</Button>
              </CardContent>
            </Card>
          )}

          <Typography variant="h6">Similar Reference Images</Typography>
          <ImageList sx={{ width: 500, height: 200 }} cols={3} rowHeight={100}>
            {referenceImages.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseImageClassifier;
