import { Group, Paper, Skeleton, Space, Stack, Title } from '@mantine/core';
import { IconBook, IconBook2, IconUsers } from '@tabler/icons-react';

const QuickStatsLoader = () => {
  return (
    <Paper shadow="xl" p="xl" withBorder>
      <Stack>
        <Title>Quick Stats</Title>

        <Space h="xs" />

        <Stack>
          <Group>
            <IconBook2 />
            <Group gap={5}>
              <Skeleton h="1.5em" w="1.5em" /> Courses
            </Group>
          </Group>
          <Group>
            <IconBook />
            <Group gap={5}>
              <Skeleton h="1.5em" w="1.5em" /> Lessons
            </Group>
          </Group>
          <Group>
            <IconUsers />
            <Group gap={5}>
              <Skeleton h="1.5em" w="1.5em" /> Students
            </Group>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuickStatsLoader;
