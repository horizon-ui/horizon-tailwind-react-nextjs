import { useUser } from '@clerk/nextjs';
import {
  useCreateActivities,
  useGetUser,
  useInvalidateQuery,
} from '@src/utils/reactQuery';
import { useEffect } from 'react';

// Example activity logger hook
export function useActivityLogger() {
  const invalidateQuery = useInvalidateQuery();
  const { user } = useUser();
  const phone = user?.phoneNumbers[0]?.phoneNumber;
  const { data: userData, refetch, isLoading } = useGetUser(phone);

  const mutation = useCreateActivities({
    onSuccess: () => {
      invalidateQuery('adminActivities');
    },
    onError: () => {},
  });

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const logActivity = ({ title, description, action }) => {
    if (!isLoading) {
      mutation.mutate({
        data: {
          title,
          description,
          action,
          //@ts-ignore
          user: userData?.data,
        },
      });
    }
  };

  return logActivity;
}
