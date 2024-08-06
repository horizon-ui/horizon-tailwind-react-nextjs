// USers
export const getAdminUsersApi = '/api/users/getAllUsers';
export const getUserByPhoneApi = '/api/users/getUserByPhone?phoneNumber=';
export const createUserApi = '/api/users/createUser';
export const updateUserApi = '/api/users/updateUser?phoneNumber=';

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

// Reports - Samples
export const getSamplesApi = '/api/report/sample/readSamples';
export const createSamplesApi = '/api/report/sample/createSample';
export const updateSamplesApi = '/api/report/sample/updateSample/?id=';
export const deleteSamplesApi = '/api/report/sample/deleteSample/?id=';

// Reports - Parameter
export const getParamtersApi = '/api/report/param/readParam';

// Reports
export const getReportsApi = '/api/report/report/readReport';
export const createReportApi = '/api/report/createReport';
export const updateReportApi = '/api/report/updateReport/?id=';
export const deleteReportApi = '/api/report/deleteReport/?id=';

// Vaccine
export const getVaccineApi = '/api/vaccine/readVaccines';
export const createVaccineApi = '/api/vaccine/createVaccine';
export const updateVaccineApi = '/api/vaccine/updateVaccine/?id=';
export const deleteVaccineApi = '/api/vaccine/deleteVaccine/?id=';

export const getDoseApi = '/api/dose/readDose';
export const createDoseApi = '/api/dose/createDose';
export const updateDoseApi = '/api/dose/updateDose/?id=';
export const deleteDoseApi = '/api/dose/deleteDose/?id=';

export const getDoseDurationApi = '/api/duration/readDuration';
export const createDoseDurationApi = '/api/duration/createDuration';
export const updateDoseDurationApi = '/api/duration/updateDuration/?id=';
export const deleteDoseDurationApi = '/api/duration/deleteDuration/?id=';

// Activities
export const createAdminActivitiessApi = '/api/userActivity/createActivity';
export const getAdminActivitiessApi = '/api/userActivity/getAllActivities';

// Setting
export const getUserSettings = '/api/userSetting/getAllUserSetting';
export const updateUserSettings = '/api/userSetting/updateUserSetting/?id=';

export const getDiagSettings = '/api/diagnosticSetting/getAllDiagnosticSetting';
export const updateDiagSettings =
  '/api/diagnosticSetting/updateDiagnosticSetting/?id=';

// Diagnostic
export const BASE_DC_URL =
  process.env.NEXT_PUBLIC_BASE_DC_URL + '/user/getUsers';
export const BASE_DC_REPORTS =
  process.env.NEXT_PUBLIC_BASE_DC_URL + '/reports/getReports';
export const BASE_OMERALD_URL =
  process.env.NEXT_PUBLIC_BASE_OMERALD_URL + '/api/profile/getAllProfiles';
