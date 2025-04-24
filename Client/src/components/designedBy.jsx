import React from 'react';
import {
    Box,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    Avatar,
    useMediaQuery,
    useTheme
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import Amit from "../assets/amit1.png"
const DeveloperCard = ({ name, batch, photoUrl, role, isLead }) => {
    return (
        <Card
            elevation={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1.5,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                }
            }}
        >
            {isLead ? (
                <Avatar
                    src={photoUrl}
                    alt={name}
                    sx={{
                        width: 60,
                        height: 60,
                        mr: 2
                    }}
                />
            ) : (
                <Avatar
                    sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        bgcolor: 'primary.main'
                    }}
                >
                    <PersonIcon />
                </Avatar>
            )}
            <CardContent sx={{ flex: 1, p: 1, '&:last-child': { pb: 1 } }}>
                <Typography variant="subtitle1" component="div" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {role}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Batch: {batch}
                </Typography>
            </CardContent>
        </Card>
    );
};

const DesignedByPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Sample developer data - replace with actual data
    const developers = [
        {
            id: 1,
            name: "Amit Verma",
            batch: "CS-2021",
            photoUrl: Amit, // Replace with actual photo URL
            role: "Team Leader",
            isLead: true
        },
        {
            id: 2,
            name: "Dheerendra Dixit",
            batch: "CS-2021",
            photoUrl: "", // No photo for member developer
            role: "Member",
            isLead: false
        }
    ];

    return (
        <Container
            maxWidth="sm"
            sx={{
                py: 2,
                px: isMobile ? 1 : 2
            }}
        >
            <Box textAlign="center" mb={2}>
                <Typography
                    variant="h6"
                  
                    fontWeight="bold"
                    color="primary"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <CodeIcon sx={{ mr: 1 }} />
                    Designed By
                </Typography>

    
            </Box>

            <Grid container spacing={2}>
                {developers.map((developer) => (
                    <Grid item xs={12} key={developer.id}>
                        <DeveloperCard {...developer} />
                    </Grid>
                ))}
            </Grid>

            <Box textAlign="center" mt={3} pt={1} borderTop={1} borderColor="divider" fontSize="small">
                <Typography variant="caption" color="text.secondary">
                    © {new Date().getFullYear()} College Portal
                </Typography>
            </Box>
        </Container>
    );
};

export default DesignedByPage;