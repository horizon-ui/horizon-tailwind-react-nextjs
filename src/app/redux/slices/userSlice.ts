import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../redux.types';

const initialState: IUser = {
  phoneNumber: '',
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.name = action.payload.name;
    },
    setUserPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearUser: (state) => {
      state.phoneNumber = '';
      state.name = '';
    },
  },
});

export const { setUser, setUserPhoneNumber, setUserName, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
