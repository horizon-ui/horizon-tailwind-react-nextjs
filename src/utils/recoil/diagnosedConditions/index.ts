const { atom } = require('recoil');

export const diagConditionState = atom({
  key: 'diagConState',
  default: {
    name: '',
    alias: '',
    status: '',
  },
});
