'use server';

import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { prisma } from '@/lib/prisma/prisma';
import { LINKS } from '@/utils/NavigationLinks';
import { RedirectType, redirect } from 'next/navigation';
import { z } from 'zod';
import { ActionError, authAction } from '../../safe-actions';

export const MarkAsCompleteAction = authAction(
  z.string(),
  async (lessonId: string, { user: { id: userId } }) => {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      select: {
        id: true,
        rank: true,
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
      throw new ActionError('User has not started this lesson yet');

    if (lessonOnUser.progress === LessonProgressSchema.Enum.IN_PROGRESS)
      await prisma.lessonOnUser.update({
        data: {
          progress: LessonProgressSchema.enum.COMPLETED,
        },
        where: {
          id: lessonOnUser.id,
        },
      });

    let nextCourses = await prisma.lesson.findMany({
      where: {
        courseId: lesson.course.id,
        rank: {
          gt: lesson.rank,
        },
        state: {
          not: LessonStateSchema.enum.HIDDEN,
        },
      },
      select: {
        id: true,
        courseId: true,
        users: {
          where: {
            userId,
          },
          select: {
            progress: true,
          },
        },
      },
      orderBy: {
        rank: 'asc',
      },
    });

    nextCourses = nextCourses.filter(
      lesson =>
        lesson.users.length === 0 ||
        lesson.users[0].progress !== LessonProgressSchema.Enum.COMPLETED,
    );

    if (!nextCourses || nextCourses.length === 0)
      await redirect(
        LINKS.Lesson.href
          .replace('{1}', lesson.course.id)
          .replace('{2}', lesson.id),
        RedirectType.replace,
      );
    else
      await redirect(
        LINKS.Lesson.href
          .replace('{1}', nextCourses[0].courseId)
          .replace('{2}', nextCourses[0].id),
        RedirectType.push,
      );
  },
);
