'use server';

import { prisma } from '@/lib/prisma/prisma';
import { z } from 'zod';
import { ActionError, authAction } from '../safe-actions';

export const JoinCourseAction = authAction(
  z.string(),
  async (courseId: string, { user: { id: userId } }) => {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new ActionError('Course not found');
    }

    const courseOnUser = await prisma.courseOnUser.findFirst({
      where: {
        courseId,
        userId,
      },
      select: {
        canceledAt: true,
      },
    });

    if (courseOnUser?.canceledAt)
      throw new ActionError('User are not allowed to join course');

    if (courseOnUser) throw new ActionError('User already joined course');

    await prisma.courseOnUser.create({
      data: {
        courseId,
        userId,
      },
    });

    const firstLesson = await prisma.lesson.findFirst({
      where: {
        courseId,
      },
    });

    return { firstLessonId: firstLesson?.id };
  },
);
