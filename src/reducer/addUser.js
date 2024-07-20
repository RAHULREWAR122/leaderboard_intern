import { createSlice } from '@reduxjs/toolkit';

const initialState = (() => {
  try {
    return JSON.parse(localStorage.getItem('userData')) || [];
  } catch {
    return [];
  }
})();

export const tasksSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('userData', JSON.stringify(state));
    }
  }
});

export const {addTask} = tasksSlice.actions;

export default tasksSlice.reducer;
