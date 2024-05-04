import { CoursesType } from '@/lib/Zod/explorer/Courses.schema';
import { Flex } from '@mantine/core';
import CourseListItem from './CourseListItem';

interface CoursesListProps {
  courses: CoursesType;
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <Flex justify="center" wrap="wrap" gap="xs">
      {courses.map(course => (
        <CourseListItem key={course.id} course={course} />
      ))}
    </Flex>
  );
};

export default CoursesList;
