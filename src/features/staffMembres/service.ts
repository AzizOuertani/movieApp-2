import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { StaffList, zStaffList } from './schema';

const STAFF_BASE_URL = '/staff';
const staffKeys = createQueryKeys('staffService', {
  staff: (params: { id?: string }) => [params],
  staffs: () => ['staffs'],
});
type StaffKeys = inferQueryKeys<typeof staffKeys>;

export const useStaffList = (
  queryOptions: UseQueryOptions<
    StaffList,
    AxiosError<ApiErrorResponse>,
    StaffList,
    StaffKeys['staffs']['queryKey']
  > = {}
) => {
  const query = useQuery(staffKeys.staffs().queryKey, {
    queryFn: async () => {
      const response = await Axios.get(STAFF_BASE_URL);

      return zStaffList().parse({
        staff: response.data,
      });
    },
    keepPreviousData: true,
    ...queryOptions,
  });
  const Staff = query.data?.staff.map((staffoption) => {
    return {
      label: staffoption.firstName ?? '' + staffoption.lastName,
      value: {
        id: staffoption.id,
        firstName: staffoption.firstName,
        lastName: staffoption.lastName,
        role: staffoption.role,
      },
    };
  });

  const isLoadingPage = query.isFetching;

  return {
    Staff,
    isLoadingPage,
    ...query,
  };
};
