import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, List, ListItem, ListItemText, Collapse, Grid, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const ProtectionHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [biosecurityProtocols, setBiosecurityProtocols] = useState([
    { id: 'protocol1', name: 'General Biosecurity Measures', description: 'Implement strict hygiene practices, control access to the farm, and regularly monitor livestock health.' },
    { id: 'protocol2', name: 'Disease Prevention Protocols', description: 'Vaccinate livestock against common diseases, implement quarantine procedures for new animals, and maintain accurate records.' },
    { id: 'protocol3', name: 'Outbreak Response Plan', description: 'Establish a clear chain of command, implement isolation measures, and report suspected cases to the authorities.' },
  ]);
  const [treatmentGuides, setTreatmentGuides] = useState([
    { id: 'treatment1', name: 'Avian Influenza Treatment', description: 'Administer antiviral medications, provide supportive care, and implement strict biosecurity measures.' },
    { id: 'treatment2', name: 'Swine Fever Treatment', description: 'Isolate infected animals, administer antibiotics to prevent secondary infections, and implement strict biosecurity measures.' },
  ]);
  const [medicationReference, setMedicationReference] = useState([
    { id: 'medication1', name: 'Amoxicillin', dosage: '10mg/kg', species: 'Pig' },
    { id: 'medication2', name: 'Tetracycline', dosage: '20mg/kg', species: 'Poultry' },
  ]);
    const [preventativeMeasures, setPreventativeMeasures] = useState([
    { id: 'measure1', name: 'Vaccination Programs', description: 'Implement regular vaccination programs to protect livestock against common diseases.' },
    { id: 'measure2', name: 'Biosecurity Audits', description: 'Conduct regular biosecurity audits to identify and address potential weaknesses in the farm\'s biosecurity practices.' },
  ]);
  const [isolationProtocols, setIsolationProtocols] = useState([
    { id: 'isolation1', name: 'Confirmed Case Isolation', description: 'Isolate all confirmed cases of the disease in a separate area, and implement strict biosecurity measures to prevent further spread.' },
    { id: 'isolation2', name: 'Suspected Case Isolation', description: 'Isolate all suspected cases of the disease until a diagnosis can be confirmed.' },
  ]);
  const [researchArticles, setResearchArticles] = useState([
    { id: 'article1', title: 'New Avian Influenza Strain Identified', summary: 'A new strain of avian influenza has been identified in [region]. This article summarizes the key findings and potential implications.' },
    { id: 'article2', title: 'Biosecurity Practices and Disease Prevention', summary: 'This article reviews the effectiveness of various biosecurity practices in preventing the spread of livestock diseases.' },
  ]);
  const [openTreatment, setOpenTreatment] = useState(null);
  const [weight, setWeight] = useState('');
  const [calculatedDosage, setCalculatedDosage] = useState('');
  const [decisionTreeStage, setDecisionTreeStage] = useState(0);
  const [decisionTreeResult, setDecisionTreeResult] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProtocols = biosecurityProtocols.filter(protocol =>
    protocol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTreatments = treatmentGuides.filter(treatment =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMedications = medicationReference.filter(medication =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const filteredPreventativeMeasures = preventativeMeasures.filter(measure =>
    measure.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIsolationProtocols = isolationProtocols.filter(protocol =>
    protocol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const filteredResearchArticles = researchArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTreatmentClick = (id) => {
    setOpenTreatment(openTreatment === id ? null : id);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateDosage = (dosage) => {
    const calculated = parseFloat(weight) * parseFloat(dosage);
    setCalculatedDosage(calculated.toString());
  };

    const handleDecisionTreeChoice = (choice) => {
    if (decisionTreeStage === 0) {
      if (choice === 'yes') {
        setDecisionTreeStage(1);
        setDecisionTreeResult('Implement isolation protocols.');
      } else {
        setDecisionTreeStage(2);
        setDecisionTreeResult('Monitor livestock closely.');
      }
    }
  };

  return (
    <div>
      <h2>Protection Hub</h2>
      <Card>
        <CardContent>
          <Typography variant="h6">Biosecurity Protocols</Typography>
          <TextField
            label="Search Protocols"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredProtocols.map((protocol) => (
              <ListItem key={protocol.id}>
                <ListItemText primary={protocol.name} secondary={protocol.description} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Treatment Guides</Typography>
          <TextField
            label="Search Treatments"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredTreatments.map((treatment) => (
              <ListItem key={treatment.id} onClick={() => handleTreatmentClick(treatment.id)}>
                <ListItemText primary={treatment.name} />
                {openTreatment === treatment.id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Medication Reference</Typography>
          <TextField
            label="Search Medications"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredMedications.map((medication) => (
              <ListItem key={medication.id}>
                <ListItemText primary={medication.name} secondary={`Dosage: ${medication.dosage} (${medication.species})`} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Calculated Dosage: {calculatedDosage}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={() => calculateDosage(medication.dosage.replace('mg/kg', ''))}>Calculate</Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

        <Card>
        <CardContent>
          <Typography variant="h6">Preventative Measures</Typography>
          <TextField
            label="Search Preventative Measures"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredPreventativeMeasures.map((measure) => (
              <ListItem key={measure.id}>
                <ListItemText primary={measure.name} secondary={measure.description} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Isolation Protocols</Typography>
          <TextField
            label="Search Isolation Protocols"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredIsolationProtocols.map((protocol) => (
              <ListItem key={protocol.id}>
                <ListItemText primary={protocol.name} secondary={protocol.description} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Disease Management Decision Tree</Typography>
          {decisionTreeStage === 0 && (
            <div>
              <Typography>Are there any confirmed cases of the disease?</Typography>
              <Button variant="contained" onClick={() => handleDecisionTreeChoice('yes')}>Yes</Button>
              <Button variant="contained" onClick={() => handleDecisionTreeChoice('no')}>No</Button>
            </div>
          )}
          {decisionTreeStage > 0 && (
            <Typography>Recommendation: {decisionTreeResult}</Typography>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Latest Research</Typography>
          <TextField
            label="Search Research Articles"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <List>
            {filteredResearchArticles.map((article) => (
              <ListItem key={article.id}>
                <ListItemText primary={article.title} secondary={article.summary} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProtectionHub;
