import { useRecoilValue } from 'recoil';
import { editTestIdState, editTestState, testDetailsState } from './reports';

const { atom } = require('recoil');

export const userListState = atom({
  key: 'userList',
  default: [
    {
      username: '',
      phoneNumber: '',
      role: '',
    },
  ],
});

export const useEditTestValues = () => useRecoilValue(editTestState);
export const useTestDetailValue = () => useRecoilValue(testDetailsState);
export const useEditTestIdValues = () => useRecoilValue(editTestIdState);
