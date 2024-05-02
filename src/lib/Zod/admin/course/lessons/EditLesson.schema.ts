import { z } from 'zod';
import { LessonStateSchema } from './LessonsState.schema';

export const EditLessonSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  state: LessonStateSchema.default('HIDDEN'),
});

export type EditLessonType = z.infer<typeof EditLessonSchema>;
