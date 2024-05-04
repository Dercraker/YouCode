import { LessonNavigationItemType } from '@/lib/Zod/lesson/LessonNavigationItem.schema';
import { Group, List } from '@mantine/core';

interface LessonNavigationItemProps {
  lesson: LessonNavigationItemType;
}

const LessonNavigationItem = ({ lesson }: LessonNavigationItemProps) => {
  return (
    <List.Item>
      <Group>{lesson.name}</Group>
    </List.Item>
  );
};

export default LessonNavigationItem;
