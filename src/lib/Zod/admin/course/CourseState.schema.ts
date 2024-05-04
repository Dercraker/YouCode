import { z } from 'zod';

export const CourseStateSchema = z.enum(['DRAFT', 'PUBLISHED']);

export type CourseStateType = z.infer<typeof CourseStateSchema>;
