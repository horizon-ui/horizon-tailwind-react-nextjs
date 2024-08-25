const { atom } = require('recoil');

export const doseState = atom({
  key: 'doseState',
  default: {
    name: '',
    doseDuration: '',
    doseType: '',
    vaccine: '',
  },
});
