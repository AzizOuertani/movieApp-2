import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { CategoryList, zCategorieList } from './schema';

const CATEGORIE_BASE_URL = '/categories';
const categorieKeys = createQueryKeys('categorieService', {
  categorie: (params: { id?: string }) => [params],
  categories: () => ['categories'],
});
type categorieKeys = inferQueryKeys<typeof categorieKeys>;
export const useCategorieList = (
  queryOptions: UseQueryOptions<
    CategoryList,
    AxiosError<ApiErrorResponse>,
    CategoryList,
    categorieKeys['categories']['queryKey']
  > = {}
) => {
  const query = useQuery(categorieKeys.categories().queryKey, {
    queryFn: async () => {
      const response = await Axios.get(CATEGORIE_BASE_URL);
      return zCategorieList().parse({
        categories: response.data,
      });
    },
    keepPreviousData: true,
    ...queryOptions,
  });
  const Categories = query.data?.categories.map((categoryOption) => {
    return {
      label: categoryOption.name,
      value: {
        id: categoryOption.id,
        name: categoryOption.name,
        description: categoryOption.description,
      },
    };
  });

  const isLoadingPage = query.isFetching;

  return {
    Categories,
    isLoadingPage,
    ...query,
  };
};
