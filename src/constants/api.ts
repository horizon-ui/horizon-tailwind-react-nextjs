// USers
export const getUserByPhoneApi = '/api/users/getUserByPhone?phoneNumber=';
export const createUserApi = '/api/users/createUser';

//Dashboard
export const getAdminDashbord = '/api/dashboard/readDashboard';

// Diagnostic
export const BASE_DC_URL =
  process.env.NEXT_PUBLIC_BASE_DC_URL + '/user/getUsers';
export const BASE_DC_REPORTS =
  process.env.NEXT_PUBLIC_BASE_DC_URL + '/reports/getReports';

export const BASE_OMERALD_URL =
  process.env.NEXT_PUBLIC_BASE_OMERALD_URL + '/api/profile/getAllProfiles';
