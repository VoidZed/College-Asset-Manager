import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, Tooltip, IconButton } from '@mui/material';
import { RemoveRedEye as RemoveRedEyeIcon, Edit as EditIcon, DeleteSweep as DeleteSweepIcon, Tag as TagIcon, Settings as SettingsIcon, Padding } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { tableHead, table1stRow } from '../utils/table'
import { styled } from '@mui/material/styles';
import { deleteColor, editColor, viewColor } from '../utils/color';
import { useIsMobile } from '../theme/theme';



const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#FEFCF8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,

    },
}));





function TableComponent({ activity_name, activity_item, filteredData, total, handleView, handleClickOpen, isDynamic, dynamicFields, isLoggedIn }) {
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

    // Get the headers based on whether it's dynamic or not
    const getTableHeaders = () => {
        if (isDynamic) {
            return dynamicFields;
        } else {
            return table1stRow[activity_item] || [];
        }
    };
    const isMobile = useIsMobile();
    const headers = getTableHeaders();

    return (
        <Paper sx={{ width: isMobile ? "88vw" : "100%", margin: "0px auto", overflow: "auto" }}>
            <TableContainer>
                <Table>
                    {/* Table Header */}
                    <TableHead sx={{ bgcolor: "#2774AE" }}>
                        <TableRow>
                            {isDynamic ? (
                                // Render dynamic headers
                                dynamicFields.map((field, index) => (
                                    <TableCell key={index} sx={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}>
                                        <Stack direction='row'>
                                            <TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
                                            {field.label}
                                        </Stack>
                                    </TableCell>
                                ))
                            ) : (
                                // Render hardcoded headers
                                headers.map((item, index) => (
                                    <TableCell key={index} sx={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}>
                                        <Stack direction='row'>
                                            <TagIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
                                            {tableHead[item]}
                                        </Stack>
                                    </TableCell>
                                ))
                            )}
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', fontSize: '13px' }}>
                                <Stack direction='row'>
                                    <SettingsIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
                                    Actions
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Table Body with Pagination */}
                    <TableBody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <StyledTableRow key={rowIndex}>
                                    {isDynamic ? (
                                        // Render dynamic data
                                        dynamicFields.map((field, fieldIndex) => {
                                            let value = row[field.key];

                                            // Format dates
                                            if (field.key.includes('date')) {
                                                value = value ? value.split("T")[0] : '';
                                            }

                                            // Format arrays
                                            if (Array.isArray(value)) {
                                                value = value.join(", ");
                                            }

                                            return (
                                                <TableCell key={fieldIndex} sx={{ textAlign: 'justify', fontSize: '12px', padding: '5px 16px' }}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })
                                    ) : (
                                        // Render hardcoded data
                                        headers.map((item, index) => {
                                            let value = row[item];

                                            // Format dates
                                            if (item === 'date' || item === 'start_date' || item === 'end_date') {
                                                value = value ? value.split("T")[0] : '';
                                            }

                                            // Format arrays
                                            if (Array.isArray(value)) {
                                                value = value.join(", ");
                                            }

                                            return (
                                                <TableCell key={index} sx={{ textAlign: 'justify', fontSize: '12px', padding: '5px 16px' }}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })
                                    )}

                                    <TableCell sx={{ padding: '5px 16px' }}>
                                        <Stack direction="row">
                                            <Tooltip title="View">
                                                <Link to={`/${activity_name}/${activity_item}/${row._id}`} style={{ textDecoration: "none" }}>
                                                    <IconButton onClick={handleView}>
                                                        <RemoveRedEyeIcon sx={{ color: viewColor }}></RemoveRedEyeIcon>
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            {/* <Tooltip title="Edit">
                                                <IconButton><EditIcon sx={{ color: editColor }}></EditIcon></IconButton>
                                            </Tooltip> */}

                                            {isLoggedIn && (
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleClickOpen(row._id)} color='red'>
                                                        <DeleteSweepIcon sx={{ color: deleteColor }}></DeleteSweepIcon>
                                                    </IconButton>
                                                </Tooltip>
                                            )}
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
        </Paper>
    );
}

export default TableComponent;