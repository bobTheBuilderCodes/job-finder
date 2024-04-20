// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: {
    userId?: number;
    fullname?: string;
    email?: string;
  };
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userData: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['userData']>) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.userData = {};
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
