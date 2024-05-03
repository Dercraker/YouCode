import Course from '@/features/course/Course';
import { CourseByIdType } from '@/lib/Zod/course/CourseById.schema';
import { requiredAuth } from '@/lib/auth/helper';
import { CouseByIdQuery } from '@/lib/prisma/course/CouseById.query';
import { CurrentCourseOnCurrentUserQuery } from '@/lib/prisma/course/CurrentCourseOnCurrentUser.query';
import { PageParams } from '@/types/next';
import CourseDialog from './CourseDialog';

type RoutePageProps = {
  courseId: string;
};

const RoutePage = async ({
  params: { courseId },
}: PageParams<RoutePageProps>) => {
  const user = await requiredAuth();

  const course: CourseByIdType = await CouseByIdQuery({
    courseId: courseId,
    userId: user.id,
  });

  const courseOnCurrentUser = await CurrentCourseOnCurrentUserQuery({
    courseId: courseId,
    userId: user.id,
  });

  return (
    <CourseDialog course={course}>
      <Course
        course={course}
        courseOnCurrentUser={courseOnCurrentUser ? true : false}
      />
    </CourseDialog>
  );
};

export default RoutePage;
