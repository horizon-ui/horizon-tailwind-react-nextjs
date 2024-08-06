// USers
export const getAdminUsersApi = '/api/users/getAllUsers';
export const getUserByPhoneApi = '/api/users/getUserByPhone?phoneNumber=';
export const createUserApi = '/api/users/createUser';

//Dashboard
export const getAdminDashbord = '/api/dashboard/readDashboard';

//Diagnosed Conditions
export const getDiagnosedConditionsApi =
  '/api/diagnosedCondition/readDiagCondition';
export const createDiagnosedConditionsApi =
  '/api/diagnosedCondition/createDiagCondition';
export const updateDiagnosedConditionsApi =
  '/api/diagnosedCondition/updateDiagCondition/?id=';
export const deleteDiagnosedConditionsApi =
  '/api/diagnosedCondition/deleteDiagCondition/?id=';

// Diagnostic
export const BASE_DC_URL =
  process.env.NEXT_PUBLIC_BASE_DC_URL + '/user/getUsers';
export const BASE_DC_REPORTS =
  process.env.NEXT_PUBLIC_BASE_DC_URL + '/reports/getReports';
export const BASE_OMERALD_URL =
  process.env.NEXT_PUBLIC_BASE_OMERALD_URL + '/api/profile/getAllProfiles';
