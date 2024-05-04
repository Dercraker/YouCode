import { z } from 'zod';

export const LessonStateSchema = z.enum(['HIDDEN', 'PUBLISHED', 'PUBLIC']);

export type LessonStateType = z.infer<typeof LessonStateSchema>;
