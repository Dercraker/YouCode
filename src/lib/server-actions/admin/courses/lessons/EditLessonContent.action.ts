'use server';

import { EditLessonContentSchema } from '@/lib/Zod/admin/course/lessons/EditLessonContent.schema';
import { prisma } from '@/lib/prisma/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';

export const EditLessonContentAction = authAction(
  EditLessonContentSchema,
  async ({ id, markdown }, { user: { id: userId } }) => {
    const lesson = await prisma.lesson.findFirst({
      where: {
        id,
        course: {
          creatorId: userId,
        },
      },
    });

    if (!lesson) throw new ActionError('Lesson not found');

    await prisma.lesson.update({
      where: {
        id,
      },
      data: {
        content: markdown,
      },
    });

    return lesson;
  },
);
