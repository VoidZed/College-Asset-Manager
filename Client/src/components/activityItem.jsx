// import React from 'react'
// import { Typography, Box, Paper, Grid2, Stack, Badge} from '@mui/material'

// import { activityDisplayCardHead, activityDisplayCardImgHeight } from "../utils/dimension"
// import { Link } from "react-router-dom"
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import { useIsMobile } from '../theme/theme';

// function activityItem({ name, desc, link, year, icon, count }) {
//     const isMobile=useIsMobile();


//     const cardWidth = isMobile ? '100%' : '200px';

//     const cardHeight = '130px'
//     console.log(`${name}: ${count}`)

//     return (


//         <Grid2 item xs={12} sm={6} md={4} lg={3} sx={{
//             userSelect: 'none', cursor: 'pointer', '&:hover': {
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//                 transform: 'translateY(-2px)',
//             }
//         }}>
//             <Badge badgeContent={count} color={count === 0 ? "default" : "primary"}
//                 sx={{
//                     "& .MuiBadge-badge": {
//                         backgroundColor: count === 0 ? "#FFCCCB" : "", // Light red when 0
//                         color: count === 0 ? "#D32F2F" : "", // Darker red text for visibility
                       
//                     }
//                 }} showZero>
//                 <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <Paper sx={{
//                         width: cardWidth,
                        

//                     }}>
//                         <Box sx={{ padding: '10px' }}>
//                             <Stack direction="row" mb={1}>
//                                 {icon && <img src={icon} alt="" height={activityDisplayCardImgHeight} />}
//                                 <Typography variant="h6" component="h2" ml={1} sx={{ fontSize: activityDisplayCardHead, fontWeight: 'bold' }}>{name}</Typography>
//                             </Stack>
//                             <Box ><Typography variant="body2" component="p" sx={{ fontSize: '12px' }}>{desc}</Typography></Box>

//                         </Box>

//                         <Stack direction="row" sx={{ padding: '10px', borderTop: '1px solid #f0f0f0', justifyContent: 'space-between', }}>
//                             <Stack direction="row" alignItems="center" >
//                                 <DateRangeIcon sx={{ fontSize: '15px', marginRight: '3px' }}></DateRangeIcon>
//                                 <Typography variant="body2" color="initial" sx={{ fontSize: '12px', color: '#454545' }}>{year}</Typography>
//                             </Stack>
//                             {/* <Stack direction="row" alignItems="center">
//                                 <Typography variant="body2" color="initial" sx={{ fontSize: '12px',color:'#454545' }}>Sem:</Typography>
//                                 <Typography variant="body2" color="initial" sx={{ fontSize: '12px' ,color:'#454545'}}>{sem}</Typography>
//                             </Stack> */}
//                         </Stack>
//                     </Paper>
//                 </Link>
//             </Badge>

//         </Grid2>
//     )
// }

// export default activityItem




import React from 'react'
import { Typography, Box, Paper, Grid2, Stack, Badge, Tooltip } from '@mui/material'
import { activityDisplayCardImgHeight } from "../utils/dimension"
import { Link } from "react-router-dom"
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useIsMobile } from '../theme/theme';

function activityItem({ name, desc, link, year, icon, count }) {
    const isMobile = useIsMobile();
    const cardWidth = isMobile ? '100%' : '200px';
    
    return (
        <Grid2 item xs={12} sm={6} md={4} lg={3}>
            <Badge 
                badgeContent={count} 
                color={count === 0 ? "default" : "primary"}
                sx={{
                    "& .MuiBadge-badge": {
                        backgroundColor: count === 0 ? "#FFCCCB" : "",
                        color: count === 0 ? "#D32F2F" : "",
                    }
                }} 
                showZero
            >
                <Link to={link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <Paper 
                        sx={{
                            width: cardWidth,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        <Box sx={{ padding: '10px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Stack direction="row" alignItems="center" mb={1}>
                                <Box sx={{ width: activityDisplayCardImgHeight, height: activityDisplayCardImgHeight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {icon && <img src={icon} alt="" height={activityDisplayCardImgHeight} />}
                                </Box>
                                <Tooltip title={name}>
                                    <Typography 
                                        variant="h6" 
                                         
                                        ml={1} 
                                        sx={{ 
                                            fontSize: '14px', 
                                            fontWeight: 'bold',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                </Tooltip>
                            </Stack>
                            <Tooltip title={desc}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography 
                                        variant="body2" 
                                        component="p" 
                                        sx={{ 
                                            fontSize: '12px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            height: '50px' // Fixed height for 3 lines at 12px font-size + line-height
                                        }}
                                    >
                                        {desc}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </Box>

                        <Stack 
                            direction="row" 
                            sx={{ 
                                padding: '10px', 
                                borderTop: '1px solid #f0f0f0', 
                                justifyContent: 'space-between',
                                marginTop: 'auto'
                            }}
                        >
                            <Stack direction="row" alignItems="center">
                                <DateRangeIcon sx={{ fontSize: '15px', marginRight: '3px' }} />
                                <Typography variant="body2" sx={{ fontSize: '12px', color: '#454545' }}>{year}</Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </Link>
            </Badge>
        </Grid2>
    )
}

export default activityItem