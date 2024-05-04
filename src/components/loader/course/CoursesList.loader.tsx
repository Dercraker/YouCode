import { Flex } from '@mantine/core';
import CourseListItemLoader from './CourseListItem.loader';

const CoursesListLoader = () => {
  return (
    <Flex justify="center" wrap="wrap" gap="xs">
      {[...Array(10)].map((_, idx) => (
        <CourseListItemLoader key={idx} />
      ))}
    </Flex>
  );
};

export default CoursesListLoader;
