'use client';

import NoLessons from '@/components/lessons/NoLessons';
import { List, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { CourseType } from '../GetCourseQuery';
import LessonItem from '../LessonItem';

interface LessonNavigationListProps {
  course: CourseType;
}

const LessonNavigationList = ({ course }: LessonNavigationListProps) => {
  const lessonsItems = course.lessons.map(lesson => (
    <LessonItem key={lesson.id} lesson={lesson} courseId={course.id} />
  ));

  return (
    <List spacing="xs" size="sm" center>
      {course.lessons.length === 0 && <NoLessons />}
      {course.lessons.length !== 0 && (
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ThemeIcon>
          }>
          {lessonsItems}
        </List>
      )}
    </List>
  );
};

export default LessonNavigationList;
