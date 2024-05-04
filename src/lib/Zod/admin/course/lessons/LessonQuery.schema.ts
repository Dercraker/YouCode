import { z } from 'zod';

export const LessonQuerySchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  take: z.number().optional().default(10),
  skip: z.number().default(0),
});

export type LessonQuerySchemaType = z.infer<typeof LessonQuerySchema>;
