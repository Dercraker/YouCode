import styles from '@/features/explorer/CourseListItem.module.css';
import { Group, Paper, Skeleton, Stack } from '@mantine/core';

const CourseListItemLoader = () => {
  return (
    <Paper
      radius="lg"
      shadow="xl"
      p="xl"
      withBorder
      w="30em"
      h="10em"
      className={styles.paper}>
      <Group
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
        align="start">
        <Skeleton w={100} h={100} />
        <Group>
          <Stack>
            <Skeleton w="15em" h="2em" />
            <Group>
              <Skeleton circle w="3em" h="3em" />
              <Skeleton w="8em" h="1.5em" />
            </Group>
          </Stack>
        </Group>
      </Group>
    </Paper>
  );
};

export default CourseListItemLoader;
