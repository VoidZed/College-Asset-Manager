import { Stack, Box, Divider, Paper, Typography, Button, Skeleton, Dialog, 
    DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, IconButton } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import { navbarColor } from '../../utils/color';
  import { activityDisplayInternalPadding } from '../../utils/dimension';
  import Action from '../Action';
  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import CloseIcon from "@mui/icons-material/Close";
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  import axios from "axios";
  import { useIsMobile } from '../../theme/theme';
  import { useTheme } from '@mui/material/styles';
  
  const UserSetting = () => {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(false);
      const [open, setOpen] = useState(false);
      const [deleteLoading, setDeleteLoading] = useState(false);
      const [selectedUserId, setSelectedUserId] = useState(null);
      const isMobile = useIsMobile();
      const theme = useTheme();
  
      
      const handleOpenDialog = (id) => {
          setSelectedUserId(id);
          setOpen(true);
      };
  
     
      const handleClose = () => {
          setOpen(false);
          setSelectedUserId(null);
      };
  
     
      const handleDelete = async () => {
          if (!selectedUserId) return;
          
          setDeleteLoading(true);
          try {
              const response = await axios.post("/api/admin/delUser", { id: selectedUserId }, { withCredentials: true });
              console.log("del:", response);
              console.log("User Deleted: ", selectedUserId);
              setUsers(users.filter(user => user._id !== selectedUserId));
              handleClose();
          } catch (error) {
              console.log("User Delete Error: ", error);
          } finally {
              setDeleteLoading(false);
          }
      };
  
      // Fetch users from backend
      const getUsers = async () => {
          setLoading(true);
          try {
              const response = await axios.post("/api/admin/getUsers", { withCredentials: true });
              console.log(response.data);
              if (response.status === 200) {
                  setUsers(response.data.data);
              }
          } catch (error) {
              console.log("Get User Error: ", error);
          } finally {
              setLoading(false);
          }
      };
  
      useEffect(() => {
          getUsers();
      }, []);
  
      return (
          <Paper sx={{ height: '100%', width: isMobile ? "88vw" : '97%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
              <Action />
              <Dialog
                  fullWidth
                  maxWidth="sm"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="delete-user-dialog"
                  sx={{
                      '& .MuiDialog-paper': {
                          borderRadius: '12px',
                          boxShadow: 24,
                      }
                  }}
              >
                  <DialogTitle id="delete-user-dialog" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600,  }}>
                      {"Do you want to delete?"}
                      <IconButton onClick={handleClose} >
                          <CloseIcon />
                      </IconButton>
                  </DialogTitle>
                  <DialogContent sx={{ padding: '20px 30px' }}>
                      <DialogContentText sx={{ color: '#5f6368', fontSize: '16px' }}>
                          You can't undo after deletion. Are you sure you want to proceed?
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions sx={{ padding: '16px', justifyContent: 'center' }}>
                      <Stack direction='row' spacing={3} justifyContent='flex-end' width='100%'>
                          <Button
                              disabled={deleteLoading}
                              variant='outlined'
                              color='success'
                              autoFocus
                              onClick={handleClose}
                              sx={{
                                  borderColor: 'green',
                                  color: 'green',
                                  borderRadius: '5px',
                                  padding: '8px 20px',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  '&:hover': {
                                      backgroundColor: '#ddffd6',
                                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                  },
                              }}
                          >
                              No
                          </Button>
                          <Button
                              disabled={deleteLoading}
                              variant='outlined'
                              color='error'
                              onClick={handleDelete}
                              autoFocus
                              sx={{
                                  borderColor: 'red',
                                  color: 'red',
                                  borderRadius: '5px',
                                  padding: '8px 20px',
                                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                  '&:hover': {
                                      backgroundColor: '#fad9d9',
                                      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                                  },
                              }}
                          >
                              {deleteLoading ? <CircularProgress size={16} color="inherit" /> : "Yes"}
                          </Button>
                      </Stack>
                  </DialogActions>
              </Dialog>
              <Box width={isMobile ? '100%' : '70%'} margin='auto'>
                  <Stack direction="row" display="flex" alignItems="center" spacing={2} mb='10px' mt={2}>
                      <ManageAccountsIcon sx={{ color: '#40403f' }} />
                      <Typography variant='h6' mt={2} gutterBottom>User Settings</Typography>
                  </Stack>
                  <Divider />
  
                  <Box sx={{ border: '1px solid lightgray', borderRadius: '5px' }} mt={2} p={1}>
                      <Typography variant="body1" color="initial">Users and their roles</Typography>
                      <TableContainer sx={{ maxWidth: "100%", margin: "auto", marginTop: 4 }}>
                          <Table>
                              <TableHead>
                                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                      <TableCell><strong>Name</strong></TableCell>
                                      <TableCell><strong>Email</strong></TableCell>
                                      <TableCell><strong>Role</strong></TableCell>
                                      <TableCell align="center"><strong>Delete</strong></TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {loading ? (
                                      // Show skeleton while loading
                                      [...Array(5)].map((_, index) => (
                                          <TableRow key={index}>
                                              <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                                              <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                                              <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                                              <TableCell><Skeleton variant="text" width="100%" /></TableCell>
                                          </TableRow>
                                      ))
                                  ) : (
                                      users.map((user) => (
                                          <TableRow key={user._id || user.id}>
                                              <TableCell>{user.name}</TableCell>
                                              <TableCell>{user.email}</TableCell>
                                              <TableCell>{user.role}</TableCell>
                                              <TableCell align="center">
                                                  <IconButton onClick={() => handleOpenDialog(user._id)} color="error">
                                                      <DeleteIcon />
                                                  </IconButton>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                  )}
                              </TableBody>
                          </Table>
                      </TableContainer>
                  </Box>
              </Box>
          </Paper>
      );
  };
  
  export default UserSetting;