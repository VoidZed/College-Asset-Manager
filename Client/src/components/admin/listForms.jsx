
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper,
  Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  IconButton, Chip, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  CircularProgress, Alert,
  Stack
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import axios from "axios"
import Action from '../Action';
import { activityDisplayInternalPadding } from '../../utils/dimension';
import { navbarColor } from '../../utils/color';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const FormManagement = () => {


  const navigate = useNavigate();

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    formId: null,
    formTitle: '',
    link: ''
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
      console.log("Get All Forms: ", response)
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

      const response = await axios.post('/api/admin/updateStatus', {
        id: form._id,
        status: statusDialog.newStatus
      })

      console.log(response)


      if (response.status !== 200) {
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

  const handleDeleteClick = (formId, title, link) => {
    setDeleteDialog({
      open: true,
      formId,
      formTitle: title,
      link: link
    });
  };

  const handleExport = (link) => {
    try {
      console.log("Link", link)
      navigate(link)
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDelete = async () => {
    try {
      const form = forms.find(f => f._id === deleteDialog.formId);
      if (!form) {
        throw new Error('Form not found');
      }

      const response = await axios.post('/api/admin/deleteDynamicForm', {
        id: form._id
      });

      if (!response) {
        throw new Error('Failed to delete form');
      }

      // Remove the form from the local state
      setForms(forms.filter(f => f._id !== deleteDialog.formId));

      setDeleteDialog({ open: false, formId: null, formTitle: '', link: "" });
    } catch (error) {
      setError(error.message);
      setDeleteDialog({ open: false, formId: null, formTitle: '', link: "" });
    }
  };

  const handleCloseStatusDialog = () => {
    setStatusDialog({ open: false, formId: null, formTitle: '', currentStatus: '', newStatus: '' });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, formId: null, formTitle: '', link: "" });
  };

  const getStatusChipColor = (status) => {
    return status === 'published' ? 'success' : 'default';
  };

  const getStatusIcon = (status) => {
    return status === 'published' ? <VisibilityIcon /> : <VisibilityOffIcon />;
  };

  return (
    <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
      <Action></Action>
      <Container maxWidth="lg" >
        <Box my={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>

            <Stack direction="row" display="flex" alignItems="center" spacing={2} >
            <FormatListBulletedIcon sx={{color:'#40403f'}}></FormatListBulletedIcon>
            <Typography variant="h5" component="h1" gutterBottom>
              Form Management
            </Typography>
            </Stack>

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
            <TableContainer component={Paper} sx={{backgroundColor: '#fffbf6'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Created</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Last Updated</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>

                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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

                      <TableCell >


                        <IconButton
                          color={form.status === 'published' ? 'success' : 'default'}
                          onClick={() => handleStatusChange(form._id, form.slug, form.title, form.status)}
                          title={form.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {getStatusIcon(form.status)}
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(form._id, form.title, `/${form.category}/${form.slug}`)}
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
              Are you sure you want to delete the form "{deleteDialog.formTitle}"? This will delete all data.
            </DialogContentText>
            <DialogContentText>Before deleting the form export the data by clicking on export.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleExport(deleteDialog.link)} color="primary">
              Export
            </Button>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      </Paper>
      );
};

      export default FormManagement;