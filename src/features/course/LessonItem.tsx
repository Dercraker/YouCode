'use client';

import { LessonFromCourseByIdType } from '@/lib/Zod/lesson/LessonFromCourseById.schema';
import { LessonProgressSchema } from '@/lib/Zod/lesson/LessonsProgress.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { List, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import styles from './LessonItem.module.css';

interface LessonItemProps {
  lesson: LessonFromCourseByIdType;
  courseId: string;
}

const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  const router = useRouter();
  const icon = useMemo(() => {
    switch (lesson.progress) {
      case LessonProgressSchema.enum.NOT_STARTED:
        return (
          <ThemeIcon color="grey" size={24} radius="xl">
            <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        );
      case LessonProgressSchema.enum.IN_PROGRESS:
        return (
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        );
      case LessonProgressSchema.enum.COMPLETED:
        return (
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        );
    }
  }, [lesson]);

  const handleClick = () => {
    router.push(
      LINKS.Lesson.href.replace('{1}', courseId).replace('{2}', lesson.id),
    );
  };

  return (
    <List.Item icon={icon} onClick={handleClick} className={styles.link}>
      {lesson.name}
    </List.Item>
  );
};

export default LessonItem;
