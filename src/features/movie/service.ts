import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import Axios from 'axios';

import { MovieList, zMovieList } from './schema';

const USERS_BASE_URL = '/movies';

export const useMovieList = (queryOptions: UseQueryOptions<MovieList> = {}) => {
  const query = useQuery({
    queryFn: async () => {
      const response = await Axios.get(USERS_BASE_URL);
      console.log(response);
      return zMovieList().parse({
        movies: response.data,
      });
    },
    keepPreviousData: true,
    ...queryOptions,
  });

  const movies = query.data?.movies;
  const isLoadingPage = query.isFetching;

  return {
    movies,
    isLoadingPage,
    ...query,
  };
};
