import { z } from 'zod';
import { LessonStateSchema } from './LessonsState.schema';

export const EditLessonSchema = z.object({
  id: z.string(),
  name: z.string(),
  state: LessonStateSchema.default('HIDDEN'),
  content: z.string(),
});

export type EditLessonType = z.infer<typeof EditLessonSchema>;
