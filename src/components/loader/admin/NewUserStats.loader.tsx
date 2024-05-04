import { Paper, Skeleton, Stack, Title } from '@mantine/core';

const NewUserStatsLoader = () => {
  return (
    <Paper shadow="xl" p="xl" withBorder>
      <Stack>
        <Title>Users course activity</Title>
        <Skeleton height={300} />
      </Stack>
    </Paper>
  );
};

export default NewUserStatsLoader;
