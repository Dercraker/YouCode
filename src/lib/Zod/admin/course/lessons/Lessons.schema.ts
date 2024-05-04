import { z } from 'zod';
import { lessonSchema } from './Lesson.schema';

export const LessonsSchema = z.array(lessonSchema);

export type LessonsType = z.infer<typeof LessonsSchema>;
