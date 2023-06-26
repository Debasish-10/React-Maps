import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  points: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    addPoint: (state, action) => {
      state.points.push(action.payload);
    },
  },
});

export const { addPoint } = mapSlice.actions;

export default mapSlice.reducer;
