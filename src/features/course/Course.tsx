import { CourseByIdType } from '@/lib/Zod/course/CourseById.schema';
import { Group } from '@mantine/core';
import CourseDetail from './CourseDetail';
import JoinButton from './JoinButton';
import LessonsList from './LessonsList';

interface CourseProps {
  course: CourseByIdType;
  courseOnCurrentUser: boolean;
}

const Course = ({ course, courseOnCurrentUser }: CourseProps) => {
  return (
    <>
      <Group align="start">
        <CourseDetail course={course} />
        <LessonsList lessons={course?.lessons} courseId={course.id} />
      </Group>
      {!courseOnCurrentUser && <JoinButton courseId={course.id} />}
    </>
  );
};

export default Course;
