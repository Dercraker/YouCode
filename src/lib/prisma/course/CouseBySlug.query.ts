import { CourseBySlugQueryType } from '@/lib/Zod/course/CourseBySlugQuery.schema';
import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { prisma } from '@/lib/prisma/prisma';

export const CouseBySlugQuery = async ({
  courseId,
  userId = '-',
}: CourseBySlugQueryType) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      lessons: {
        where: {
          state: {
            in: ['PUBLIC', 'PUBLISHED'],
          },
        },
        orderBy: {
          rank: 'asc',
        },
        select: {
          name: true,
          id: true,
          courseId: true,
          state: true,
          users: {
            where: {
              userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
        },
      },

      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  if (!course) {
    throw new Error('Course not found');
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

  return {
    ...course,
    lessons,
  };
};
