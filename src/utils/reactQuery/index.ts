import {
  createAdminActivitiessApi,
  createDiagnosedConditionsApi,
  createDoseApi,
  createDoseDurationApi,
  createReportApi,
  createUserApi,
  createVaccineApi,
  deleteDiagnosedConditionsApi,
  deleteDoseApi,
  deleteDoseDurationApi,
  deleteParamtersApi,
  deleteReportApi,
  deleteSamplesApi,
  deleteVaccineApi,
  getAdminActivitiessApi,
  getAdminDashbord,
  getAdminUsersApi,
  getDiagnosedConditionsApi,
  getDiagSettings,
  getDoseApi,
  getDoseDurationApi,
  getParamtersApi,
  getReportsApi,
  getSamplesApi,
  getUserByPhoneApi,
  getUserSettings,
  getVaccineApi,
  updateDiagnosedConditionsApi,
  updateDiagSettings,
  updateDoseApi,
  updateDoseDurationApi,
  updateReportApi,
  updateUserApi,
  updateUserSettings,
  updateVaccineApi,
} from '@src/constants/api';
import axios, { AxiosResponse } from 'axios';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

// useQuery hook to get data
export function useQueryGetData<T>(
  queryName: string,
  query: string,
  options?: UseQueryOptions<T>,
) {
  const queryKey = [queryName];
  return useQuery<T>(queryKey, () => axios.get(query), options);
}

// useQuery hook to set data
interface UseMutationProps<TData, TVariables> {
  onSuccess?: (data: AxiosResponse<TData>) => void;
  onError?: (error: any) => void;
}

function CreateMutation<TData, TVariables>(
  method: 'put' | 'post' | 'delete',
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>,
) {
  return useMutation(
    (data: any) =>
      axios[method](url, method === 'delete' ? null : data?.data, {
        headers:
          method === 'post'
            ? { 'Content-Type': 'application/json' }
            : undefined,
      }),
    {
      onSuccess,
      onError,
    },
  );
}

export function useAdminUsers() {
  return useQueryGetData('adminUserData', getAdminUsersApi);
}

// GET
export function useGetUser(userPhoneNumber: string) {
  const encodedPhoneNumber = encodeURIComponent(userPhoneNumber);
  return useQueryGetData('userData', getUserByPhoneApi + encodedPhoneNumber, {
    enabled: !!userPhoneNumber,
  });
}

export function useGetDashboard() {
  return useQueryGetData('adminDashboard', getAdminDashbord);
}

export function useGetDiagnosedConditions() {
  return useQueryGetData('diagnosedConditions', getDiagnosedConditionsApi);
}

export function useGetActivities() {
  return useQueryGetData('userActivities', getAdminActivitiessApi);
}

export function useGetSamples() {
  return useQueryGetData('reportSampleType', getSamplesApi);
}

export function useGetReports() {
  return useQueryGetData('reportData', getReportsApi);
}

export function useGetParameters() {
  return useQueryGetData('paramData', getParamtersApi);
}

export function useGetVaccine() {
  return useQueryGetData('vaccineData', getVaccineApi);
}

export function useGetDoseDuration() {
  return useQueryGetData('durationData', getDoseDurationApi);
}

export function useGetDoses() {
  return useQueryGetData('doseData', getDoseApi);
}

export function useGetUserSetting() {
  return useQueryGetData('userSettings', getUserSettings);
}

export function useGetDiagSetting() {
  return useQueryGetData('diagSettings', getDiagSettings);
}

//*************************** */

// Post calls
export function useCreateUser<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createUserApi, props);
}

export function useCreateDC<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createDiagnosedConditionsApi, props);
}

export function useCreateVaccine<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createVaccineApi, props);
}

export function useCreateDose<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createDoseApi, props);
}

export function useCreateDoseDuration<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createDoseDurationApi, props);
}

export function useCreateActivities<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createAdminActivitiessApi, props);
}

export function useCreateReport<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createReportApi, props);
}

// Update call

// Delete
function UpdateMutation<TData, TVariables>(
  method: 'put',
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>,
) {
  return useMutation(
    (data: any) =>
      axios[method](url + data?.recordId, data?.data, {
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      onSuccess,
      onError,
    },
  );
}

export function useUpdateDC<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateDiagnosedConditionsApi, props);
}

export function useUpdateUser<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateUserApi, props);
}

export function useUpdateVaccine<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateVaccineApi, props);
}

export function useUpdateDose<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateDoseApi, props);
}

export function useUpdateDoseDuration<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateDoseDurationApi, props);
}

export function useUpdateUserSetting<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateUserSettings, props);
}

export function useUpdateDiagSetting<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateDiagSettings, props);
}

export function useUpdateReport<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return UpdateMutation('put', updateReportApi, props);
}

// Delete
function DeleteMutation<TData, TVariables>(
  method: 'delete',
  url: string,
  { onSuccess, onError }: UseMutationProps<TData, TVariables>,
) {
  return useMutation((recordId: string) => axios[method](url + recordId), {
    onSuccess,
    onError,
  });
}

export function useDeleteDC<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteDiagnosedConditionsApi, props);
}

export function useDeleteVaccine<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteVaccineApi, props);
}

export function useDeleteDose<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteDoseApi, props);
}

export function useDeleteDoseDuration<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteDoseDurationApi, props);
}

export function useDeleteReport<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteReportApi, props);
}

export function useDeleteParam<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteParamtersApi, props);
}

export function useDeleteSample<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return DeleteMutation('delete', deleteSamplesApi, props);
}

// Invalidate
export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: string) => {
    queryClient.invalidateQueries(queryKey);
  };

  return invalidateQuery;
}
