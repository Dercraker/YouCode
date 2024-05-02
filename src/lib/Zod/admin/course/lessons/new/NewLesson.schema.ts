import { z } from 'zod';
import { LessonStateSchema } from '../LessonsState.schema';

export const NewLessonSchema = z.object({
  courseId: z.string().min(1),
  name: z.string().min(1),
  state: LessonStateSchema,
});

export type NewLessonType = z.infer<typeof NewLessonSchema>;
