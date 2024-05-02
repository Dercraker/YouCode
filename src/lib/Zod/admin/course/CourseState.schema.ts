import { z } from 'zod';

export const CourseSateSchema = z.enum(['DRAFT', 'PUBLISHED']);

export type CourseSateType = z.infer<typeof CourseSateSchema>;
