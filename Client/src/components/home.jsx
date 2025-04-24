import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Stack,
    Grow,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import student from '../assets/student.png';
import logo from '../assets/srms.jpg';
import { useIsMobile } from '../theme/theme';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const isMobile = useIsMobile();
    const [loaded, setLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = () => {
        navigate("/r&d_cell")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <Box sx={{
            flexGrow: 1,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <AppBar position="static" sx={{
                backgroundColor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                flexShrink: 0,
                pt: 1,
                pb: 1
            }}>
                <Toolbar sx={{
                    padding: { xs: '0 8px', sm: '0 16px', md: '0 64px' },
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        overflow: 'hidden'
                    }}>
                        <Grow in={loaded} timeout={800}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                maxWidth: '100%'
                            }}>
                                <img
                                    src={logo}
                                    alt="College Logo"
                                    style={{
                                        width: isMobile ? 35 : 60,
                                        height: isMobile ? 35 : 60,
                                        minWidth: isMobile ? 35 : 60,
                                        borderRadius: '50%',
                                        marginRight: isMobile ? '6px' : '10px',
                                        transition: 'transform 0.3s ease-in-out',
                                        flexShrink: 0
                                    }}
                                />
                                <Box sx={{
                                    flexShrink: 1,
                                    overflow: 'hidden'
                                }}>
                                    <Stack direction='column'>
                                        <Typography
                                            variant={isMobile ? "caption" : "h6"}
                                            sx={{
                                                color: 'darkred',
                                                fontWeight: 'bold',
                                                letterSpacing: isMobile ? '0.2px' : '0px',
                                                fontSize: isMobile ? '0.7rem' : undefined
                                            }}
                                        >
                                            SHRI RAM MURTI SMARAK
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#40403f',
                                                fontWeight: 'bold',
                                                fontSize: isMobile ? '0.65rem' : "13px",
                                            }}
                                        >
                                            College of Engineering & Technology
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color: '#212121',
                                                fontSize: isMobile ? '0.6rem' : '0.75rem',
                                            }}
                                        >
                                            Bareilly
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grow>
                    </Box>

                    {isMobile ? (
                        <Box>
                            <Grow in={loaded} timeout={1000}>
                                <IconButton
                                    size="small"
                                    edge="end"
                                    color="error"
                                    aria-label="menu"
                                    onClick={handleMenu}
                                    sx={{
                                        ml: 1,
                                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 0, 0, 0.15)',
                                        }
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grow>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Typography color="error" fontWeight="bold">Login</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Grow in={loaded} timeout={1000}>
                            <Button
                                onClick={handleLogin}
                                variant="outlined"
                                color='error'
                                sx={{
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(221, 202, 202, 0.3)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 8px rgba(221, 202, 202, 0.3)',
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </Grow>
                    )}
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    flexGrow: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: `
                        radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 30%),
                        radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 30%),
                        linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, transparent 50%)
                    `,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 20px 30px, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 2px, transparent 3px),
                            radial-gradient(circle at 40px 80px, rgba(255, 255, 255, 0.15) 0, rgba(255, 255, 255, 0.15) 4px, transparent 5px),
                            radial-gradient(circle at 60px 15px, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 1px, transparent 2px),
                            radial-gradient(circle at 160px 120px, rgba(255, 255, 255, 0.15) 0, rgba(255, 255, 255, 0.15) 3px, transparent 4px),
                            radial-gradient(circle at 85px 60px, rgba(255, 255, 255, 0.1) 0, rgba(255, 255, 255, 0.1) 5px, transparent 6px),
                            radial-gradient(circle at 125px 30px, rgba(255, 255, 255, 0.12) 0, rgba(255, 255, 255, 0.12) 2px, transparent 3px),
                            radial-gradient(circle at 200px 90px, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.08) 4px, transparent 5px),
                            radial-gradient(circle at 180px 60px, rgba(255, 255, 255, 0.06) 0, rgba(255, 255, 255, 0.06) 1px, transparent 2px)
                        `,
                        backgroundSize: '220px 140px',
                        backgroundRepeat: 'repeat',
                        opacity: 0.7,
                        zIndex: 1,
                        animation: 'floatingDots 60s infinite linear',
                    },
                    '@keyframes floatingDots': {
                        '0%': { backgroundPosition: '0px 0px' },
                        '100%': { backgroundPosition: '220px 140px' }
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-10%',
                        width: '70%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                        transform: 'rotate(-35deg)',
                        animation: 'moveGradient 15s infinite alternate ease-in-out',
                        zIndex: 0
                    },
                    '@keyframes moveGradient': {
                        '0%': { transform: 'rotate(-35deg) translateX(0)' },
                        '100%': { transform: 'rotate(-35deg) translateX(10%)' }
                    }
                }}
            >
                <Container maxWidth="xl" sx={{ height: '100%', position: 'relative', zIndex: 2 }}>
                    {/* Mobile view - Image first, then content */}
                    {isMobile && (
                        <Box
                            sx={{
                                width: '70%',
                                mx: 'auto',
                                mt: 4,
                                mb: 2,
                                textAlign: 'center'
                            }}
                        >
                            <Grow in={loaded} timeout={1300}>
                                <img
                                    src={student}
                                    alt="Student with laptop"
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))'
                                    }}
                                />
                            </Grow>
                        </Box>
                    )}
                    
                    {/* Content section - for both mobile and desktop */}
                    <Stack
                        direction={isMobile ? 'column' : 'row'}
                        sx={{ height: isMobile ? 'auto' : '100%' }}
                    >
                        <Grow in={loaded} timeout={1200}>
                            <Box
                                sx={{
                                    pt: { xs: 2, md: 6 },
                                    pl: { xs: 2, md: 8 },
                                    pr: { xs: 2, md: 0 },
                                    width: { xs: '100%', md: '50%' },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    height: isMobile ? 'auto' : '100%'
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'white',
                                        mb: 2,
                                        animation: 'fadeSlideUp 0.8s ease-out',
                                        animationFillMode: 'both',
                                        '@keyframes fadeSlideUp': {
                                            from: { opacity: 0, transform: 'translateY(20px)' },
                                            to: { opacity: 1, transform: 'translateY(0)' }
                                        }
                                    }}
                                >
                                    Welcome to College Portal
                                </Typography>

                                <Typography
                                    variant={isMobile ? "h4" : "h3"}
                                    sx={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        mb: 3,
                                        animation: 'fadeSlideUp 0.8s ease-out 0.2s',
                                        animationFillMode: 'both',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    SRMS Asset Manager
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'white',
                                        mb: 4,
                                        maxWidth: '90%',
                                        animation: 'fadeSlideUp 0.8s ease-out 0.4s',
                                        animationFillMode: 'both',
                                        lineHeight: 1.6
                                    }}
                                >
                                    This portal is a centralized platform to manage, track, and showcase academic, cultural, and technical activities, empowering students and faculty with organized data, event insights, and streamlined administration.
                                </Typography>
                                <Button
                                    onClick={handleClick}
                                    variant="contained"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        backgroundColor: '#ff5252',
                                        borderRadius: '4px',
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 'bold',
                                        alignSelf: 'flex-start',
                                        transition: 'all 0.3s ease',
                                        animation: 'fadeSlideUp 0.8s ease-out 0.6s',
                                        animationFillMode: 'both',
                                        '&:hover': {
                                            backgroundColor: '#ff1a1a',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 6px 12px rgba(255, 0, 0, 0.3)',
                                            cursor: 'pointer'
                                        },
                                        mb: isMobile ? 4 : 0
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Box>
                        </Grow>

                        {/* Desktop view image */}
                        {!isMobile && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    right: { md: '10%', lg: '15%' },
                                    bottom: '10%',
                                    width: '35%',
                                }}
                            >
                                <Grow in={loaded} timeout={1500}>
                                    <img
                                        src={student}
                                        alt="Student with laptop"
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))'
                                        }}
                                    />
                                </Grow>
                            </Box>
                        )}
                    </Stack>
                </Container>

                <Box sx={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '10%',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    boxShadow: '0 0 15px 5px rgba(255,255,255,0.1)',
                    animation: 'pulse 8s infinite alternate ease-in-out',
                    '@keyframes pulse': {
                        '0%': { opacity: 0.3, transform: 'scale(1)' },
                        '100%': { opacity: 0.7, transform: 'scale(1.3)' }
                    },
                    display: { xs: 'none', md: 'block' },
                    zIndex: 2,
                    pointerEvents: 'none'
                }} />

                <Box sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '5%',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    boxShadow: '0 0 10px 3px rgba(255,255,255,0.1)',
                    animation: 'pulse 6s infinite alternate-reverse ease-in-out',
                    display: { xs: 'none', md: 'block' },
                    zIndex: 2,
                }} />

                {/* Extra Floating Dots */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            width: `${Math.floor(Math.random() * 20) + 5}px`,
                            height: `${Math.floor(Math.random() * 20) + 5}px`,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 70%)',
                            boxShadow: '0 0 8px 2px rgba(255,255,255,0.1)',
                            left: `${Math.floor(Math.random() * 80) + 10}%`,
                            top: `${Math.floor(Math.random() * 80) + 10}%`,
                            animation: `float ${Math.floor(Math.random() * 10) + 15}s infinite alternate ease-in-out`,
                            '@keyframes float': {
                                '0%': { transform: 'translateY(0) translateX(0)' },
                                '50%': { transform: 'translateY(20px) translateX(10px)' },
                                '100%': { transform: 'translateY(-20px) translateX(-10px)' }
                            },
                            zIndex: 2
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default HomePage;