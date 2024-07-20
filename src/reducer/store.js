import { configureStore } from '@reduxjs/toolkit';
import addUserTask from './addUser';


export const store = configureStore({
  reducer: {
    data : addUserTask,
  },
});

