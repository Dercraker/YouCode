import { List, Skeleton } from '@mantine/core';
import { IconCircleDashed } from '@tabler/icons-react';

const LessonItemLoader = () => {
  return (
    <List.Item icon={<IconCircleDashed />}>
      <Skeleton w="12em" h="1.5em" />
    </List.Item>
  );
};

export default LessonItemLoader;
