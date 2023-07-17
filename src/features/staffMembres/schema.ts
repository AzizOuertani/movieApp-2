import { z } from 'zod';

export const zRole = () => z.enum(['Director', 'Author', 'Actor']);

export type staff = z.infer<ReturnType<typeof zStaff>>;

export const zStaff = () =>
  z.object({
    id: z.number(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    role: zRole().nullish(),
  });

export type StaffList = z.infer<ReturnType<typeof zStaffList>>;
export const zStaffList = () =>
  z.object({
    staff: z.array(zStaff()),
  });
