export type ADMIN_USER = {
  userName: string;
  phoneNumber: string;
  role: string;
};
// ****************  USER  ************************
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

// ****************  USER  ************************
export type ADMIN_ACTIVITY_RESP = {
  title: string;
  description: string;
  action: string;
  timeStamp: string;
  user: ADMIN_USER;
  _id?: string;
  __v?: number;
};

export const userActivityData: ADMIN_ACTIVITY_RESP[] = [
  {
    _id: '66a63bacbebb034285a1dedc',
    title: 'Added Report',
    description: 'Added Blood Test Report',
    user: {
      userName: 'Mohammed Saif',
      phoneNumber: '+918553548532',
      role: 'admin',
    },
    action: 'added',
    timeStamp: '2024-07-28T12:38:04.957Z',
    __v: 0,
  },
  {
    _id: '66a63bacbebb034285a1dedc',
    title: 'Added Report2',
    description: 'Added Urine Test Report2',
    user: {
      userName: 'Mohammed Salman',
      phoneNumber: '+918553548532',
      role: 'admin',
    },
    action: 'added',
    timeStamp: '2024-07-28T12:38:04.957Z',
    __v: 0,
  },
];

// ****************************************
