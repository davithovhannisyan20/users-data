import React from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import moment from 'moment';

const UserProfile = () => {
    const { username } = useParams();
    const users = useSelector(state => state.usersData.usersList)
    
    const user = users.find(curUser => curUser.username === username);

    return (
        <div>
            {
                user ?
                    <>
                        <h2>
                            {user.name}
                        </h2>
                        <h4>
                            {user.administrator ? 'Administrator' : 'User'}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                            <div style={{ marginRight: '20px'}}>
                                <div style={{ marginBottom: '10px'}}>Username:</div>
                                <div style={{ marginBottom: '10px'}}>Email:</div>
                                <div>Profile created on:</div>
                            </div>
                            <div>
                                <div style={{ marginBottom: '10px'}}>{user.username}</div>
                                <div style={{ marginBottom: '10px'}}>{user.email}</div>
                                <div>{moment.unix(user.createdon.seconds).format("D MMMM YYYY HH:MM:SS")}</div>
                            </div>
                        </div>
                    </>
                :
                    <h2>
                        Wrong Username
                    </h2>
            }
        </div>
    )
}

export default UserProfile;