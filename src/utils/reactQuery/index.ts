import { getUserByPhoneApi } from '@src/constants/api';
import axios, { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

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

export function useGetUser(userPhoneNumber: string) {
  const encodedPhoneNumber = encodeURIComponent(userPhoneNumber);
  return useQueryGetData('userData', getUserByPhoneApi + encodedPhoneNumber, {
    enabled: !!userPhoneNumber,
  });
}

// function createMutation<TData, TVariables>(
//   method: 'put' | 'post' | 'delete',
//   url: string,
//   { onSuccess, onError }: UseMutationProps<TData, TVariables>,
// ) {
//   return useMutation(
//     (data: any) =>
//       axios[method](url, method === 'delete' ? null : data?.data, {
//         headers:
//           method === 'post'
//             ? { 'Content-Type': 'application/json' }
//             : undefined,
//       }),
//     {
//       onSuccess,
//       onError,
//     },
//   );
// }

// Functions for different mutations
// export function useGetUser({ userPhoneNumber }: any) {
//   return useQueryGetData('userData', getDiagnosticUserApi + userPhoneNumber, {
//     enabled: !!userPhoneNumber,
//   });
// }

// export function useGetDcProfile({ selectedCenterId }: any) {
//   return useQueryGetData(
//     'diagnosticCenter',
//     getDiagProfileByPhoneApi + selectedCenterId,
//     { enabled: !!selectedCenterId },
//   );
// }

// export function useCreateUser<TData, TVariables>(
//   props: UseMutationProps<TData, TVariables>,
// ) {
//   return createMutation('post', createDiagnosticUserApi, props);
// }

// export function useUpdateUser<TData, TVariables>(
//   props: UseMutationProps<TData, TVariables>,
//   userId: String,
// ) {
//   return createMutation('put', updateDiagnosticUserApi + userId, props);
// }
