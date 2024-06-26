import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsAPI } from '../services/jobs';
import userSlice from './userSlice';
import { countriesAPI } from '../services/helpers';
import { authAPI } from '../services/auth';
import { applicationAPI } from '../services/applications';


// Combine the reducers
const rootReducer = combineReducers({
  user: userSlice,
  [jobsAPI.reducerPath]: jobsAPI.reducer,
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,

  [countriesAPI.reducerPath]: countriesAPI.reducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([jobsAPI.middleware, countriesAPI.middleware, authAPI.middleware, applicationAPI.middleware]),
});

// Optional: Add the RTK Query setupListeners function to the store to enable automatic cache synchronization and lifecycle hooks
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
