import {createSlice} from '@reduxjs/toolkit';
import storage, {storageKeys} from '../../services/storage';
const initialState: UserSlice = {
  userData: storage.get(storageKeys.signInData),
  loginToken: storage.get(storageKeys.loginToken),
  isReadCompleted: {isRead: false, isQuiz: false},
  userID: storage.get(storageKeys.userId) || 0,
  spinners: 0,
  userName: '',
  loginType: storage.get(storageKeys.loginType),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    setLoginType: (state, action) => {
      state.loginType = action.payload;
    },
    setReadStatus: (state, action) => {
      state.isReadCompleted = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    addSpinner: state => {
      state.spinners = state.spinners + 1;
    },
    removeSpinner: state => {
      if (state.spinners < 1) {
        return;
      }
      state.spinners = state.spinners - 1;
    },
  },
});

export const {
  setUserData,
  setReadStatus,
  setUserID,
  addSpinner,
  removeSpinner,
  setLoginType,
  setLoginToken,
  setUserName,
} = userSlice.actions;
export default userSlice.reducer;
