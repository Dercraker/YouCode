'use server';

import { getTheMiddleRank } from '@/lib/GetTheMiddleRank';
import { LessonMoveSchema } from '@/lib/Zod/admin/courses/lessons/LessonMove.schema';
import { prisma } from '@/lib/prisma/prisma';
import { ActionError, authAction } from '@/lib/server-actions/safe-actions';

export const LessonMoveAction = authAction(
  LessonMoveSchema,
  async (
    { courseId, downItemRank, lessonId, upItemRank },
    { user: { id: userId } },
  ) => {
    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
        creatorId: userId,
        lessons: {
          some: {
            id: lessonId,
          },
        },
      },
    });

    if (!course) throw new ActionError('This course does not exist');

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,
        courseId,
      },
    });

    if (!lesson) throw new ActionError('This lesson does not exist');

    const newRank = getTheMiddleRank(upItemRank, downItemRank);

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        rank: newRank,
      },
    });

    return newRank;
  },
);
