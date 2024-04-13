// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { setupListeners } from '@reduxjs/toolkit/query';
import { jobsAPI } from '../services/jobs';


// Combine the reducers
const rootReducer = combineReducers({
  // Add the generated reducer as a key under which the RTK Query middleware will manage its state
  [jobsAPI.reducerPath]: jobsAPI.reducer,
  // Add other reducers as needed
  // exampleReducer: exampleReducer,
});

// Create the store
export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsAPI.middleware),
});

// Optional: Add the RTK Query setupListeners function to the store to enable automatic cache synchronization and lifecycle hooks
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
