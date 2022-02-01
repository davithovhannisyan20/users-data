import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';

export const getUsers = createAsyncThunk(
  'usersData/getUsers',
  async () => {

    const querySnapshot = getDocs(collection(db, 'users')).then((snapshot) => {
      const data = snapshot.docs.map(item => ({ ...item.data() }));
      return data;
    });

    const data = await querySnapshot;
    return data;
  }
)

export const userSlice = createSlice({
  name: 'usersData',
  initialState: {
    loading: false,
    usersList: [],
  },
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.usersList = payload;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
    },
  }
})

export default userSlice.reducer