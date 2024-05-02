import { LessonType } from '@/lib/Zod/admin/course/lessons/Lesson.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { Badge, Group, Paper, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import styles from './AdminLessonListItem.module.css';

interface LessonListItemProps {
  lesson: LessonType;
}

const AdminLessonListItem = ({ lesson }: LessonListItemProps) => {
  return (
    <Paper
      radius="md"
      px="xl"
      py="md"
      withBorder
      className={styles.item}
      component={Link}
      href={LINKS.Admin.AdminEditLesson.href
        .replace('{1}', lesson.course.id)
        .replace('{2}', lesson.id)}>
      <Group justify="space-between" align="end">
        <Stack gap={0}>
          <Badge m="0" radius="md" color={'red'}>
            {lesson.state}
          </Badge>
          <Title>{lesson.name}</Title>
        </Stack>
      </Group>
    </Paper>
  );
};

export default AdminLessonListItem;
