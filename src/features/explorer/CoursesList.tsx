import PaginationComponent from '@/components/Pagination/Pagination';
import { CoursesType } from '@/lib/Zod/explorer/Courses.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { Flex, Stack } from '@mantine/core';
import CourseListItem from './CourseListItem';

interface CoursesListProps {
  courses: CoursesType;
  coursesCount: number;
}

const CoursesList = ({ courses, coursesCount }: CoursesListProps) => {
  return (
    <Stack align="center">
      <Flex justify="center" wrap="wrap" gap="xs">
        {courses.map(course => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </Flex>
      <PaginationComponent
        baseUri={LINKS.Explorer.href}
        total={Math.ceil(coursesCount / 10)}
        queryKey="explorerPage"
      />
    </Stack>
  );
};

export default CoursesList;
