import { z } from 'zod';
import { LessonStateSchema } from './LessonsState.schema';

export const lessonSchema = z.object({
  id: z.string(),
  name: z.string(),
  rank: z.string(),
  content: z.string(),
  state: LessonStateSchema,
  createdAt: z.date(),
  course: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type LessonType = z.infer<typeof lessonSchema>;
