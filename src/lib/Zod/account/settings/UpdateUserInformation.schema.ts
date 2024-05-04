import { z } from 'zod';

export const UpdateUserInformationSchema = z.object({
  image: z.string().min(1).url(),
  name: z.string().min(1),
});

export type UpdateUserInformationType = z.infer<
  typeof UpdateUserInformationSchema
>;
