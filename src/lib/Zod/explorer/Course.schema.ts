import { z } from 'zod';

export const CourseSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  creator: z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    image: z.string().nullable(),
  }),
});

export type CourseType = z.infer<typeof CourseSchema>;
