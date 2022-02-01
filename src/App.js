import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUsers } from './store/userSlice';
import UsersList from './components/usersList';
import Community from './components/community';
import UserProfile from './components/userProfile';

import { Button } from '@mui/material';

import { List as ListIcon, Forum} from '@mui/icons-material';

function App() {  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
      <BrowserRouter>
        <nav>
          <ul style={{ width: '200px', listStyleType: 'none', margin: 0, padding: 0}}>
            <li style={{ padding: '10px'}}>
              <Button
                component={Link}
                to='/'
                variant='contained'
                color='primary'
                startIcon={<ListIcon />}
              >
                Users List
              </Button>
            </li>
            <li style={{ padding: '10px'}}>
              <Button
                component={Link}
                to='/community'
                variant='contained'
                color='primary'
                startIcon={<Forum />}
              >
                Community
              </Button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<UsersList />} />
          <Route path='community' element={<Community />} />
          <Route path='/user/:username' element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
