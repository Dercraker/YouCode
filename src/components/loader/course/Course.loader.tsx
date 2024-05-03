'use client';

import { Group } from '@mantine/core';
import CourseDetailPlaceholder from './CourseDetail.loader';
import LessonsListLoader from './LessonsList.loader';

const CoursePlaceholder = () => {
  return (
    <Group justify="start" align="start">
      <CourseDetailPlaceholder />
      <LessonsListLoader />
    </Group>
  );
};

export default CoursePlaceholder;
