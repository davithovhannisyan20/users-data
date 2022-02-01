import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel }  from '@mui/material';

import { setDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { getUsers } from '../store/userSlice';

const UserDialog = ({ handleClose, open, dialogType, selectedUser }) => {
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.usersData.usersList);

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [administrator, setAdministrator] = useState(false);

    useEffect(() => {
        if (Object.keys(selectedUser).length !== 0) {
            setUsername(selectedUser.username);
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setAdministrator(selectedUser.administrator);
        } else {
            setUsername('');
            setName('');
            setEmail('');
            setAdministrator('');
        }
    }, [selectedUser])

    const handleAddUser = async () => {
        try {
            await setDoc(doc(db, 'users', username), {
                username,
                name,
                email,
                administrator,
                createdon: Timestamp.now(),
            })
            dispatch(getUsers());
        } catch (err) {
            alert(err);
        }
        handleClose();
    }

    const handleEditUser = async () => {
        try {
            await updateDoc(doc(db, 'users', username), {
                name,
                email,
                administrator,
            });
            dispatch(getUsers());
        } catch (err) {
            alert(err);
        }
        handleClose();
    }

    const notUniqueUsername = useMemo(() => {
        return usersList.some(user => user.username === username);
    }, [usersList, username])

    return (
        <Dialog onClose={handleClose} open={open} >
            <DialogTitle>{dialogType === 'Add' ? 'Add new user' : 'Edit user'}</DialogTitle>
            <FormControl style={{ margin: '20px' }}>
                <TextField
                    required
                    id='username'
                    label='Username'
                    variant='outlined'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={dialogType === 'Edit'}
                    error={notUniqueUsername && dialogType === 'Add'}
                    helperText={notUniqueUsername && dialogType === 'Add' ? 'Username should be unique' : ""}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    required
                    id='name'
                    label='Name'
                    variant='outlined'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    required
                    id='email'
                    label='Email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <FormLabel id='radio-buttons'>Administrator</FormLabel>
                <RadioGroup
                    value={administrator}
                    name='administrator-group'
                    onChange={(e) => {
                        const boolValue = e.currentTarget.value === 'true' ? true : false;
                        setAdministrator(boolValue);
                    }}
                >
                    <FormControlLabel value={false} control={<Radio />} label='No' />
                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                </RadioGroup>
            </FormControl>
            <DialogActions>
                <Button
                    variant='outlined'
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    textcolor='white'
                    disabled={!username || !name || !email || (notUniqueUsername && dialogType === 'Add')}
                    onClick={dialogType === 'Add' ? handleAddUser : handleEditUser}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserDialog;