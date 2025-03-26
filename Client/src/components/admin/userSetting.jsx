import { Stack, Box, Divider, Paper, Typography, Button, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from '../../utils/dimension';
import Action from '../Action';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from "axios";
import { useIsMobile } from '../../theme/theme';

const UserSeting = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMobile=useIsMobile();

    // Handle delete row
    const handleDelete = (id) => {
        setUsers(users.filter(user => user._id !== id));
    };

    // Fetch users from backend
    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/admin/getUsers",{withCredentials:true});
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
        <Paper sx={{ height: '100%',width:isMobile ? "88vw" :'97%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action />
            <Box width={isMobile?'100%':'70%'} margin='auto'>
            <Stack direction="row" display="flex" alignItems="center" spacing={2} mb='10px' mt={2}>
             <ManageAccountsIcon sx={{color:'#40403f'}}/>
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
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleDelete(user._id)} color="error">
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

export default UserSeting;
