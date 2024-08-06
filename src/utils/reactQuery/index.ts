import {
  createAdminActivitiessApi,
  createDiagnosedConditionsApi,
  createUserApi,
  deleteDiagnosedConditionsApi,
  getAdminDashbord,
  getAdminUsersApi,
  getDiagnosedConditionsApi,
  getUserByPhoneApi,
  updateDiagnosedConditionsApi,
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

export function useCreateActivities<TData, TVariables>(
  props: UseMutationProps<TData, TVariables>,
) {
  return CreateMutation('post', createAdminActivitiessApi, props);
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

// Invalidate
export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: string) => {
    queryClient.invalidateQueries(queryKey);
  };

  return invalidateQuery;
}
