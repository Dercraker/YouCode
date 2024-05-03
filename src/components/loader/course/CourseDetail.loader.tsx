import { Group, Paper, Skeleton, Stack } from '@mantine/core';

const CourseDetailPlaceholder = () => {
  return (
    <Paper radius="lg" shadow="xl" p="xl" withBorder flex={4}>
      <Stack>
        <Group>
          <Skeleton h={100} w={100} />
          <Group>
            <Stack>
              <Skeleton w="30em" h="2em" />
              <Group>
                <Skeleton circle w="2.375em" h="2.375em" />
                <Skeleton w="7em" h="1.2em" />
              </Group>
            </Stack>
          </Group>
        </Group>
        <Stack>
          <Skeleton w="30em" h="2em" />
          <Skeleton w="45em" h="20em" />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CourseDetailPlaceholder;
