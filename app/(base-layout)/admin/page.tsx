import { Button, Stack } from '@mantine/core';

const RoutePage = () => {
  return (
    <Stack>
      <Button component="a" href="/admin/courses">
        Liste des cours
      </Button>
    </Stack>
  );
};

export default RoutePage;
