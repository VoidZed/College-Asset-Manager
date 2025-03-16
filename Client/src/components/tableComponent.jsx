import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, Tooltip, IconButton } from '@mui/material';
import { RemoveRedEye as RemoveRedEyeIcon, Edit as EditIcon, DeleteSweep as DeleteSweepIcon, Tag as TagIcon, Settings as SettingsIcon, Padding } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { tableHead, table1stRow } from '../utils/table'
import { styled } from '@mui/material/styles';
import { deleteColor, editColor, viewColor } from '../utils/color';




const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FEFCF8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,

    },
}));



function TableComponent({ activity_name, activity_item, filteredData, total, handleView, handleClickOpen }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    // Handle Page Change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle Rows Per Page Change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (


        < Paper sx={{ width: "100%", margin: "10px auto", overflow: "hidden" }}>
            <TableContainer>
                <Table>
                    {/* Table Header */}
                    <TableHead sx={{ bgcolor: "#2774AE" }}>
                        <TableRow >
                            {table1stRow[activity_item] && table1stRow[activity_item].map((item, index) => (
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}><Stack direction='row'><TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />{tableHead[item]}</Stack></TableCell>
                            ))}
                            {table1stRow[activity_item] && <TableCell sx={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}><Stack direction='row'><SettingsIcon sx={{ fontSize: '20px', marginRight: '5px' }} />Actions</Stack></TableCell>
                            }


                        </TableRow>
                    </TableHead>

                    {/* Table Body with Pagination */}
                    <TableBody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <StyledTableRow key={index}>

                                    {table1stRow && table1stRow[activity_item].map((item, index) => {
                                        let value = row[item];
                                        // formated date 
                                        if (item === 'date' || item === 'start_date' || item === 'end_date') {
                                            value = value.split("T")[0]
                                        }

                                        //display department values comma separated
                                        else if (item === 'department') {
                                            value = value.join(" , ")
                                        }



                                        return (
                                            <TableCell key={index} sx={{ textAlign: 'center', fontSize: '12px', padding: '5px 16px' }}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}



                                    <TableCell sx={{ padding: '5px 16px' }}>
                                        <Stack direction="row">

                                            <Tooltip title="View">  <Link to={`/${activity_name}/${activity_item}/${row._id}`} style={{ textDecoration: "none" }}><IconButton onClick={handleView}><RemoveRedEyeIcon sx={{ color: viewColor }}></RemoveRedEyeIcon></IconButton></Link></Tooltip>
                                            <Tooltip title="Edit">   <IconButton ><EditIcon sx={{ color: editColor }}></EditIcon></IconButton></Tooltip>
                                            <Tooltip title="Delete">   <IconButton onClick={() => handleClickOpen(row._id)} color='red'><DeleteSweepIcon sx={{ color: deleteColor }}
                                            ></DeleteSweepIcon></IconButton></Tooltip>
                                        </Stack>
                                    </TableCell>


                                </StyledTableRow>


                            ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >
    );
}

export default TableComponent;