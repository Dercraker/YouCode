import { z } from 'zod';

export const CourseDetailSchema = z.object({
  course: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
  }),
});
