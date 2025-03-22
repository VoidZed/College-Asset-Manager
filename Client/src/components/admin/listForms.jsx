
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper,
  Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  IconButton, Chip, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  CircularProgress, Alert
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import axios from "axios"
const FormManagement = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    formId: null,
    formTitle: ''
  });
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    formId: null,
    formTitle: '',
    currentStatus: '',
    newStatus: ''
  });

  const fetchForms = async () => {
    try {

      setLoading(true);
      const response = await axios.get('/api/admin/getForms');
      
      if (!response) {
        throw new Error('Failed to fetch forms');
      }
      console.log("Get All Forms: ",response)
      const data = await response.data.forms;
      setForms(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleStatusChange = async (formId, slug, title, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    setStatusDialog({
      open: true,
      formId,
      formTitle: title,
      currentStatus,
      newStatus
    });
  };

  const confirmStatusChange = async () => {
    try {
      const form = forms.find(f => f._id === statusDialog.formId);
      if (!form) {
        throw new Error('Form not found');
      }
      
      const response = await fetch(`/api/forms/${form.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: statusDialog.newStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update form status');
      }
      
      // Update the form in the local state
      setForms(forms.map(f => {
        if (f._id === statusDialog.formId) {
          return { ...f, status: statusDialog.newStatus };
        }
        return f;
      }));
      
      setStatusDialog({ open: false, formId: null, formTitle: '', currentStatus: '', newStatus: '' });
    } catch (error) {
      setError(error.message);
      setStatusDialog({ open: false, formId: null, formTitle: '', currentStatus: '', newStatus: '' });
    }
  };

  const handleDeleteClick = (formId, title) => {
    setDeleteDialog({
      open: true,
      formId,
      formTitle: title
    });
  };

  const confirmDelete = async () => {
    try {
      const form = forms.find(f => f._id === deleteDialog.formId);
      if (!form) {
        throw new Error('Form not found');
      }

      const response = await fetch(`/api/forms/${form.slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      // Remove the form from the local state
      setForms(forms.filter(f => f._id !== deleteDialog.formId));
      
      setDeleteDialog({ open: false, formId: null, formTitle: '' });
    } catch (error) {
      setError(error.message);
      setDeleteDialog({ open: false, formId: null, formTitle: '' });
    }
  };

  const handleCloseStatusDialog = () => {
    setStatusDialog({ open: false, formId: null, formTitle: '', currentStatus: '', newStatus: '' });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, formId: null, formTitle: '' });
  };

  const getStatusChipColor = (status) => {
    return status === 'published' ? 'success' : 'default';
  };

  const getStatusIcon = (status) => {
    return status === 'published' ? <VisibilityIcon /> : <VisibilityOffIcon />;
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Form Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/forms/create"
          >
            Create New Form
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : forms.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No forms available
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Get started by creating your first form
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Submissions</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form._id}>
                    <TableCell>{form.title}</TableCell>
                    <TableCell>
                      {new Date(form.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(form.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(form.status)}
                        label={form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                        color={getStatusChipColor(form.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{form.submissionsCount || 0}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        component={RouterLink}
                        to={`/forms/${form.slug}/submissions`}
                        title="View Submissions"
                      >
                        <FormatListBulletedIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        component={RouterLink}
                        to={`/forms/${form.slug}/edit`}
                        title="Edit Form"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color={form.status === 'published' ? 'success' : 'default'}
                        onClick={() => handleStatusChange(form._id, form.slug, form.title, form.status)}
                        title={form.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {getStatusIcon(form.status)}
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(form._id, form.title)}
                        title="Delete Form"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Status Change Dialog */}
      <Dialog
        open={statusDialog.open}
        onClose={handleCloseStatusDialog}
      >
        <DialogTitle>
          {statusDialog.newStatus === 'published' ? 'Publish Form' : 'Unpublish Form'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {statusDialog.newStatus === 'published' ? 'publish' : 'unpublish'} the form "{statusDialog.formTitle}"?
            {statusDialog.newStatus === 'published' 
              ? ' This will make the form accessible to users.' 
              : ' This will make the form inaccessible to users.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmStatusChange} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Delete Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the form "{deleteDialog.formTitle}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormManagement;