import { CourseBySlugQueryType } from '@/lib/Zod/course/CourseBySlugQuery.schema';
import { prisma } from '../prisma';

export const CurrentCourseOnCurrentUserQuery = async ({
  courseId,
  userId,
  allowCanceled = false,
}: CourseBySlugQueryType) => {
  const courseOnCurrentUser = await prisma.courseOnUser.findFirst({
    where: {
      courseId,
      userId,
      createdAt: allowCanceled
        ? undefined
        : {
            not: undefined,
          },
    },
  });

  return courseOnCurrentUser;
};
