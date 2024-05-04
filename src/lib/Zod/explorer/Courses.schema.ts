import { z } from 'zod';
import { CourseSchema } from './Course.schema';

export const CoursesSchema = z.array(CourseSchema);

export type CoursesType = z.infer<typeof CoursesSchema>;
