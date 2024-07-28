export type ADMIN_USER = {
  userName: string;
  phoneNumber: string;
  role: string;
};

export type ADMIN_USER_RESP = {
  userName: string;
  phoneNumber: string;
  role: string;
  _id?: string;
  deletedAt?: string;
  createdAt?: string;
};

export const userData: ADMIN_USER_RESP[] = [
  {
    _id: '66a59452ca2c44bb5797c55a',
    role: 'admin',
    userName: 'Test User',
    phoneNumber: '+15555550100',
    deletedAt: null,
    createdAt: '2024-07-28T00:44:02.050Z',
  },
  {
    _id: '66a59452ca2c44bb5797c551',
    role: 'user',
    userName: 'Test User2',
    phoneNumber: '+15555550101',
    deletedAt: null,
    createdAt: '2024-07-28T00:44:02.050Z',
  },
];
