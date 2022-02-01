import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import usersData from './userSlice';

const reducer = combineReducers({
  usersData,
})
const store = configureStore({
  reducer,
})
export default store;