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


const loadInitialState = (): UserState => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const userData: UserData = JSON.parse(userString);
  
   
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
