import CoursesListLoader from '@/components/loader/course/CoursesList.loader';
import { Stack } from '@mantine/core';

const RouteLoading = () => {
  return (
    <Stack align="center">
      <CoursesListLoader />
    </Stack>
  );
};

export default RouteLoading;
