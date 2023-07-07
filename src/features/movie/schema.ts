import { z } from 'zod';

export const zlanguage = () => z.enum(['Francais', 'Anglais', 'Arabe']);
export const zRole = () => z.enum(['Director', 'Author', 'Actor']);
export type movies = z.infer<ReturnType<typeof zMovie>>;

export const zMovie = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    language: zlanguage(),
    imageUrl: z.string().nullish(),
    publishDate: z.string().nullish(),
    membreStaffs: z.array(zStaff()).nullable(),
    description: z.string(),
    categories: z.array(zCategory()).nullable(),
    duration: z.string(),
  });
export type staff = z.infer<ReturnType<typeof zStaff>>;

export const zStaff = () =>
  z.object({
    id: z.number(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    role: z.array(zRole().nullish()),
  });
export type category = z.infer<ReturnType<typeof zCategory>>;

export const zCategory = () =>
  z.object({
    id: z.number(),
    name: z.string().nullish(),
    description: z.string().nullish(),
    role: z.array(zRole().nullish()),
  });
export type MovieList = z.infer<ReturnType<typeof zMovieList>>;
export const zMovieList = () =>
  z.object({
    movies: z.array(zMovie()),
  });
