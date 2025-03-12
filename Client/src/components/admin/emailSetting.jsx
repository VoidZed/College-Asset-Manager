import { Stack, Box, Divider, Paper, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from '../../utils/dimension';
import Action from '../Action';
import EmailIcon from '@mui/icons-material/Email';
const EmailSetting = () => {


    return (

        <Paper sx={{ height: '100%', overflowY: 'auto', padding: activityDisplayInternalPadding, bgcolor: navbarColor, borderTopLeftRadius: "20px" }}>
            <Action></Action>
            <Typography variant='h6' mt={2}>Email Settings</Typography>
            <Divider></Divider>

            {/* display current email for sending and receiving emails */}

            <Box sx={{ border: '1px solid lightgray', borderRadius: '5px' }} mt={2} p={1}>
                <Typography variant="body1" color="initial">Current Email for Sending Emails</Typography>
                <Stack direction="row" spacing={1} mt={1}>
                    <Typography variant="body2" color="initial">Email:</Typography>
                    <Typography variant="body2" color="initial">example@gmail.com</Typography>
                </Stack>

            </Box>


            {/* create form for  addinng email */}

            <Box component="form" mt={3}>

                <Stack direction="row" spacing={1}>
                    <TextField
                        size='small'
                        id="email"
                        label="Email"
                        type='email'


                    />
                    <TextField id="app-password"
                        size='small'
                        label="App Password"
                        type='password'></TextField>

                    <Button variant='contained' type='submit'>Add</Button>
                </Stack>

            </Box>

        </Paper>

    );
};

export default EmailSetting;