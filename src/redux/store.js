import { configureStore } from '@reduxjs/toolkit';
import pointReducer from './reducers/pointReducer';

const store = configureStore({
  reducer: {
    map: pointReducer,
  },
});

export default store;
