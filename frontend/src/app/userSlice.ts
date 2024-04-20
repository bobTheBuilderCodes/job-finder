import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  userId?: string;
  fullname?: string;
  token?: string;
}

interface UserState {
  userData: UserData | null;
  isLoggedIn: boolean;
}

// Function to load initial user data from local storage
const loadInitialState = (): UserState => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const userData: UserData = JSON.parse(userString);
    console.log("Gotten user data", userData);
    // Check for presence of token to ensure user is considered logged in
    return {
      userData,
      isLoggedIn: !!userData.token,
    };
  }

  return { userData: null, isLoggedIn: false };
}

const initialState: UserState = loadInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      state.isLoggedIn = Boolean(action.payload && action.payload.token);

      // Store the entire user object in local storage as a JSON string
      if (action.payload && action.payload.token) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    clearUser: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
