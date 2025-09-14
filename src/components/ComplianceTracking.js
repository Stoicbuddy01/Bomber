import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { PieChart, Pie, Cell } from 'recharts';

const ComplianceTracking = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [complianceData, setComplianceData] = useState({
    compliantFarms: 0,
    nonCompliantFarms: 0,
    expiringCertificates: 0,
  });
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [documentTemplates, setDocumentTemplates] = useState([
    { id: 'template1', name: 'Biosecurity Checklist', description: 'Checklist for assessing biosecurity measures on farms.' },
    { id: 'template2', name: 'Disease Reporting Form', description: 'Form for reporting suspected disease outbreaks.' },
    { id: 'template3', name: 'Medication Usage Log', description: 'Log for recording medication usage on livestock.' },
  ]);
  const [selectedApprovals, setSelectedApprovals] = useState([]);

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      const pendingApprovalsSnapshot = await getDocs(
        collection(db, 'complianceDocuments'),
      );
      const pendingApprovalsList = pendingApprovalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(doc => doc.status === 'pending');
      setPendingApprovals(pendingApprovalsList);
    };

    const fetchComplianceData = async () => {
      // Fetch compliant farms (example: status is approved)
      const compliantFarmsSnapshot = await getDocs(
        collection(db, 'farms'),
      );
      const compliantFarmsCount = compliantFarmsSnapshot.docs.filter(doc => doc.data().complianceStatus === 'compliant').length;

      // Fetch non-compliant farms (example: status is not approved)
      const nonCompliantFarmsSnapshot = await getDocs(
        collection(db, 'farms'),
      );
      const nonCompliantFarmsCount = nonCompliantFarmsSnapshot.docs.filter(doc => doc.data().complianceStatus === 'non-compliant').length;

      // Fetch expiring certificates (example: expiring in next 30 days)
      const expiringCertificatesSnapshot = await getDocs(
        collection(db, 'complianceDocuments'),
      );
      const expiringCertificatesCount = expiringCertificatesSnapshot.docs.filter(doc => {
        const expiryDate = doc.data().expiryDate.toDate();
        const timeDiff = expiryDate.getTime() - new Date().getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysLeft <= 30;
      }).length;

      setComplianceData({
        compliantFarms: compliantFarmsCount,
        nonCompliantFarms: nonCompliantFarmsCount,
        expiringCertificates: expiringCertificatesCount,
      });
    };

    const fetchVerificationHistory = async () => {
      const verificationHistorySnapshot = await getDocs(
        collection(db, 'complianceVerifications'),
      );
      const verificationHistoryList = verificationHistorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVerificationHistory(verificationHistoryList);
    };

    fetchPendingApprovals();
    fetchComplianceData();
    fetchVerificationHistory();
  }, []);

  const handleApprove = async (docId) => {
    const docRef = doc(db, 'complianceDocuments', docId);
    await updateDoc(docRef, { status: 'approved' });
    // Refresh pending approvals
    const fetchPendingApprovals = async () => {
      const pendingApprovalsSnapshot = await getDocs(
        collection(db, 'complianceDocuments'),
      );
      const pendingApprovalsList = pendingApprovalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(doc => doc.status === 'pending');
      setPendingApprovals(pendingApprovalsList);
    };

    fetchPendingApprovals();
  };

  const handleReject = async (docId) => {
    const docRef = doc(db, 'complianceDocuments', docId);
    await updateDoc(docRef, { status: 'rejected' });
    // Refresh pending approvals
    const fetchPendingApprovals = async () => {
      const pendingApprovalsSnapshot = await getDocs(
        collection(db, 'complianceDocuments'),
      );
      const pendingApprovalsList = pendingApprovalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })).filter(doc => doc.status === 'pending');
      setPendingApprovals(pendingApprovalsList);
    };

    fetchPendingApprovals();
  };

  const handleToggleSelect = (docId) => {
    if (selectedApprovals.includes(docId)) {
      setSelectedApprovals(selectedApprovals.filter(id => id !== docId));
    } else {
      setSelectedApprovals([...selectedApprovals, docId]);
    }
  };

  const handleBatchApprove = async () => {
    for (const docId of selectedApprovals) {
      await handleApprove(docId);
    }
    setSelectedApprovals([]);
  };

  const handleBatchReject = async () => {
    for (const docId of selectedApprovals) {
      await handleReject(docId);
    }
    setSelectedApprovals([]);
  };

  const handleExportPdf = () => {
    // Implement PDF export logic here
    alert('Exporting to PDF...');
  };

  const handleExportExcel = () => {
    // Implement Excel export logic here
    alert('Exporting to Excel...');
  };

  const pieChartData = [
    { name: 'Compliant', value: complianceData.compliantFarms },
    { name: 'Non-Compliant', value: complianceData.nonCompliantFarms },
  ];

  const pieChartColors = ['#0088FE', '#FF8042'];

  return (
    <div>
      <h2>Compliance Tracking</h2>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Farms by Compliance Status</Typography>
              <PieChart width={400} height={300}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="body2">Compliant: {complianceData.compliantFarms}</Typography>
              <Typography variant="body2">Non-Compliant: {complianceData.nonCompliantFarms}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Expiring Certificates (Next 30 Days)</Typography>
              <Typography variant="h4">{complianceData.expiringCertificates}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <h3>Verification History</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="verification history table">
          <TableHead>
            <TableRow>
              <TableCell>Document Name</TableCell>
              <TableCell>Farm Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Verified Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verificationHistory.map((log) => (
              <TableRow
                key={log.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{log.documentName}</TableCell>
                <TableCell>{log.farmName}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.verifiedDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Document Template Library</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="document templates table">
          <TableHead>
            <TableRow>
              <TableCell>Template Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentTemplates.map((template) => (
              <TableRow
                key={template.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{template.name}</TableCell>
                <TableCell>{template.description}</TableCell>
                <TableCell>
                  <Button variant="contained">Create Document</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Document Verification</h3>
      <Button variant="contained" onClick={handleBatchApprove} disabled={selectedApprovals.length === 0}>Batch Approve</Button>
      <Button variant="contained" color="error" onClick={handleBatchReject} disabled={selectedApprovals.length === 0}>Batch Reject</Button>
      <Button variant="contained" onClick={handleExportPdf}>Export to PDF</Button>
      <Button variant="contained" onClick={handleExportExcel}>Export to Excel</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pending approvals table">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Farm Name</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingApprovals.map((doc) => (
              <TableRow
                key={doc.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedApprovals.includes(doc.id)}
                    onChange={() => handleToggleSelect(doc.id)}
                  />
                </TableCell>
                <TableCell>{doc.documentName}</TableCell>
                <TableCell>{doc.farmName}</TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleApprove(doc.id)}>Approve</Button>
                  <Button variant="contained" color="error" onClick={() => handleReject(doc.id)}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComplianceTracking;
