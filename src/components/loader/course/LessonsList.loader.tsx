import { List, Paper, Stack, Title, rem } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import LessonItemLoader from './LessonItem.loader';

const LessonsListLoader = () => {
  return (
    <Paper
      shadow="xl"
      p="xl"
      withBorder
      flex={1}
      mah="80vh"
      miw="10em"
      style={{ overflowY: 'scroll' }}>
      <Stack>
        <Title order={3}>Lessons</Title>

        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          }>
          {[...Array(10)].map((_, index) => (
            <LessonItemLoader key={index} />
          ))}
        </List>
      </Stack>
    </Paper>
  );
};

export default LessonsListLoader;
