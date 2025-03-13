import { Stack, Box, Divider, Paper, Typography, TextField, Button, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { navbarColor } from '../../utils/color';
import { activityDisplayInternalPadding } from '../../utils/dimension';
import Action from '../Action';
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch,useSelector } from 'react-redux';
import { updateEmail } from '../../store/emailSlice';
import axios from "axios"
const EmailSetting = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //get the email value fro mredux
    const emailValue = useSelector((state) => state.email.email);
    const dispatch = useDispatch();
    console.log("Email: ",emailValue)




    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {

            console.log(email, password)
            const response = await axios.post('/api/admin/email', {
                email: email,
                password: password
            });
            console.log(response)

            if (response.status === 201) {
                dispatch(updateEmail(response.data.data.email))
            }


        } catch (error) {

        }
    }



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
                    <Typography variant="body2" color="initial">{emailValue}</Typography>
                </Stack>

            </Box>


            {/* create form for  addinng email */}

            <Box component="form" onSubmit={handleFormSubmit} mt={3}>

                <Stack direction="row" spacing={1}>
                    <TextField
                        size='small'
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        type='email'


                    />
                    <TextField id="app-password"
                        size='small'
                        label="App Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'></TextField>

                    <Button variant='contained' type='submit'>Add</Button>
                </Stack>
                <FormHelperText >*If you add email the previous email will be updates</FormHelperText>
            </Box>
          

        </Paper>

    );
};

export default EmailSetting;