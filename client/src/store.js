import {configureStore} from '@reduxjs/toolkit';
import userSlice from './Store/UserAuthSlice';

export const store = configureStore({
  reducer:{
    user:userSlice,
  }
})