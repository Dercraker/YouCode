'use server';

import { EditLessonSchema } from '@/lib/Zod/admin/course/lessons/EditLesson.schema';
import { prisma } from '@/lib/prisma/prisma';
import { authAction } from '@/lib/server-actions/safe-actions';

export const EditLessonAction = authAction(
  EditLessonSchema,
  async ({ id, name, state }, ctx) => {
    const lesson = await prisma.lesson.update({
      where: {
        id,
      },
      data: {
        name,
        state,
      },
    });

    return lesson;
  },
);
