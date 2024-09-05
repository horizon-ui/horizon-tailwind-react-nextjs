const { atom } = require('recoil');

export const testDetailsState = atom({
  key: 'testDetailsState',
  default: {},
});

export const editTestState = atom({
  key: 'editTest',
  default: false,
});

export const editTestIdState = atom({
  key: 'editTestOd',
  default: {},
});

export const bioRefState = atom({
  key: 'bioRef',
  default: {},
});

export const paramState = atom({
  key: 'param',
  default: {},
});

