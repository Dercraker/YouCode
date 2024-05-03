import { CourseByIdQueryType } from '@/lib/Zod/course/CourseByIdQuery.schema';
import { prisma } from '../prisma';

export const CurrentCourseOnCurrentUserQuery = async ({
  courseId,
  userId,
  allowCanceled = false,
}: CourseByIdQueryType) => {
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
