import { z } from 'zod';

export type category = z.infer<ReturnType<typeof zCategory>>;

export const zCategory = () =>
  z.object({
    id: z.number(),
    name: z.string().nullish(),
    description: z.string().nullish(),
    movies: z.string().nullish(),
  });
export type CategoryList = z.infer<ReturnType<typeof zCategorieList>>;
export const zCategorieList = () =>
  z.object({
    categories: z.array(zCategory()),
  });
