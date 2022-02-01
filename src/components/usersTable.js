import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper }  from '@mui/material';
import { withStyles } from '@mui/styles';
import { Delete, Edit } from '@mui/icons-material';
import { db } from '../configs/firebase';
import { doc, deleteDoc} from 'firebase/firestore';
import { getUsers } from '../store/userSlice';

const styles = {
    removeIcon: {
        cursor: 'pointer'
    },
    editIcon: {
        marginRight: '20px',
        cursor: 'pointer'
    }
};

const UsersTable = ({ classes, data, handleDialogOpen, setDialogType, setSelectedUser }) => {
    const dispatch = useDispatch();
    
    const handleDeleteUser = async (user) => {
        try {
            await deleteDoc(doc(db, 'users', user.username));
            dispatch(getUsers());
        } catch (err) {
            alert(err);
        }
    }
    
    return (
        <TableContainer component={Paper} style={{ width: '100%'}}>
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.username}>
                            <TableCell>
                                <Link to={`/user/${user.username}`}>{user.username}</Link>
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <Edit
                                    className={classes.editIcon}
                                    onClick={() => {
                                        setDialogType('Edit');
                                        setSelectedUser(user)
                                        handleDialogOpen();
                                    }}
                                />
                                <Delete
                                    className={classes.removeIcon}
                                    onClick={() => {
                                        handleDeleteUser(user);
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withStyles(styles)(UsersTable);