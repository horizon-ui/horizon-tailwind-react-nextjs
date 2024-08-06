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
