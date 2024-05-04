'use server';

import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { prisma } from '@/lib/prisma/prisma';
import { LINKS } from '@/utils/NavigationLinks';
import { RedirectType, redirect } from 'next/navigation';
import { z } from 'zod';
import { ActionError, authAction } from '../../safe-actions';

export const MarkInProgressAction = authAction(
  z.string(),
  async (lessonId: string, { user: { id: userId } }) => {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        course: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!lesson) throw new ActionError('Lesson not found');

    const lessonOnUser = await prisma.lessonOnUser.findFirst({
      where: {
        lessonId,
        userId,
      },
      select: {
        id: true,
        progress: true,
      },
    });
    if (!lessonOnUser)
      await prisma.lessonOnUser.create({
        data: {
          lessonId,
          userId,
          progress: LessonProgressSchema.enum.IN_PROGRESS,
        },
      });

    if (
      lessonOnUser?.progress === LessonProgressSchema.Enum.NOT_STARTED ||
      lessonOnUser?.progress === LessonProgressSchema.Enum.COMPLETED
    )
      await prisma.lessonOnUser.update({
        data: {
          progress: LessonProgressSchema.enum.IN_PROGRESS,
        },
        where: {
          id: lessonOnUser.id,
        },
      });

    redirect(
      LINKS.Lesson.href
        .replace('{1}', lesson.course.id)
        .replace('{2}', lesson.id),
      RedirectType.replace,
    );
  },
);
