import React, { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const FarmerTrainingModules = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Basic Biosecurity Practices', description: 'Learn the fundamentals of biosecurity.' },
    { id: 2, title: 'Disease Identification', description: 'Identify common livestock diseases.' },
    { id: 3, title: 'Emergency Procedures', description: 'Respond effectively to emergencies.' },
  ]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Training Modules</Typography>
        <List>
          {courses.map(course => (
            <ListItem key={course.id}>
              <ListItemText primary={course.title} secondary={course.description} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FarmerTrainingModules;



