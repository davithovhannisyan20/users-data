import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button }  from '@mui/material';
import { Add } from '@mui/icons-material';

import UsersTable from './usersTable';
import UserDialog from './userDialog';

const UsersList = () => {
    const { usersList, loading } = useSelector((state) => state.usersData);

    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('Add');
    const [selectedUser, setSelectedUser] = useState({});

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setDialogType('Add');
        setSelectedUser({});
    };

    if (loading) return <h2>Loading users data...</h2>
  
    return (
        <div style={{ width: '100%'}}>
            <h2>Users list</h2>
            <UsersTable
                data={usersList}
                handleDialogOpen={handleDialogOpen}
                open={open}
                setDialogType={setDialogType}
                setSelectedUser={setSelectedUser}
            />
            <Button
                style={{ marginTop: '10px' }}
                variant='outlined'
                onClick={handleDialogOpen}
                startIcon={<Add />}
            >
                Add user
            </Button>
            <UserDialog
                handleClose={handleDialogClose}
                open={open}
                dialogType={dialogType}
                selectedUser={selectedUser}
            />
        </div>
    )
}

export default UsersList;
