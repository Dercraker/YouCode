import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { prisma } from '@/lib/prisma/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const lessonQuerySchema = z.object({
  lessonId: z.string(),
  userId: z.string(),
});

export type LessonQuery = z.infer<typeof lessonQuerySchema>;

export const lessonQuery = async ({ lessonId, userId }: LessonQuery) => {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      state: {
        not: LessonStateSchema.enum.HIDDEN,
      },
    },
    select: {
      id: true,
      name: true,
      content: true,
      state: true,
      users: {
        where: {
          userId,
        },
        select: {
          id: true,
          progress: true,
        },
      },
    },
  });

  if (!lesson) {
    return null;
  }

  return lesson;
};

export type LessonType = NonNullable<
  Prisma.PromiseReturnType<typeof lessonQuery>
>;
