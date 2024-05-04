import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { prisma } from '@/lib/prisma/prisma';
import { Prisma } from '@prisma/client';

export const GetCourseQuery = async ({ courseId }: { courseId: string }) => {
  const user = await requiredAuth();

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      lessons: {
        where: {
          state: {
            not: LessonStateSchema.enum.HIDDEN,
          },
        },
        select: {
          courseId: true,
          id: true,
          name: true,
          state: true,
          users: {
            where: {
              userId: user.id,
            },
            select: {
              id: true,
              progress: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessons = course.lessons.map(lesson => {
    const progress =
      lesson.users.length == 0 || lesson.users[0]?.progress == undefined
        ? LessonProgressSchema.enum.NOT_STARTED
        : lesson.users[0]?.progress;

    return {
      ...lesson,
      progress,
    };
  });

  return { ...course, lessons };
};

export type CourseType = NonNullable<
  Prisma.PromiseReturnType<typeof GetCourseQuery>
>;
