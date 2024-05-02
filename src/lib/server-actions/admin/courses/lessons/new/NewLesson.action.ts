'use server';

import { NewLessonSchema } from '@/lib/Zod/admin/course/lessons/new/NewLesson.schema';
import { prisma } from '@/lib/prisma/prisma';
import { authAction } from '@/lib/server-actions/safe-actions';

export const NewLessonAction = authAction(
  NewLessonSchema,
  async ({ courseId, name, state }, ctx) => {
    const lesson = await prisma.lesson.create({
      data: {
        name,
        courseId,
        state,
        content: '## Default content',
        rank: 'aaaa',
      },
    });

    return lesson;
  },
);
