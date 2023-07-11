import {
  createQueryKeys,
  inferQueryKeys,
} from '@lukemorales/query-key-factory';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { MovieList, movies, zMovie, zMovieList } from './schema';

const USERS_BASE_URL = '/movies';

const moviesKeys = createQueryKeys('moviesService', {
  movie: (params: { id?: string }) => [params],
});
type MoviesKeys = inferQueryKeys<typeof moviesKeys>;

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
export const useMovie = (
  MovieId?: string,
  config: UseQueryOptions<
    movies,
    AxiosError<ApiErrorResponse>,
    movies,
    MoviesKeys['movie']['queryKey']
  > = {}
) => {
  const query = useQuery(
    moviesKeys.movie({ id: MovieId }).queryKey,
    async () => {
      const response = await Axios.get(`${USERS_BASE_URL}/${MovieId}`);
      return zMovie().parse(response.data);
    },
    {
      enabled: !!MovieId,
      ...config,
    }
  );

  const formatData = {
    ...query.data,
  };

  return {
    ...query,
    data: formatData,
  };
};
