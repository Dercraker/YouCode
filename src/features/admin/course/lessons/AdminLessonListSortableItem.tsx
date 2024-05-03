import { LessonType } from '@/lib/Zod/admin/course/lessons/Lesson.schema';
import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Burger, Group, Paper, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import styles from './AdminLessonListItem.module.css';

interface LessonListItemProps {
  lesson: LessonType;
}

const AdminLessonListSortableItem = ({ lesson }: LessonListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
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
        <Group justify="space-between" align="center">
          <Stack gap={0}>
            <Badge
              m="0"
              radius="md"
              color={
                lesson.state === LessonStateSchema.enum.HIDDEN
                  ? 'red'
                  : lesson.state === LessonStateSchema.enum.PUBLIC
                  ? 'blue'
                  : 'teal'
              }>
              {lesson.state}
            </Badge>
            <Title>{lesson.name}</Title>
          </Stack>
          <div
            onClickCapture={evn => {
              evn.stopPropagation();
              evn.preventDefault();
            }}>
            <Burger {...listeners} className={styles.moveItem} />
          </div>
        </Group>
      </Paper>
    </div>
  );
};

export default AdminLessonListSortableItem;
