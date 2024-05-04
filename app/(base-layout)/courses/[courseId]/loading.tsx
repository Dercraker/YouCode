import CoursePlaceholder from '@/components/loader/course/Course.loader';
import { Container, Divider, Stack, Title } from '@mantine/core';

const RouteLoading = () => {
  return (
    <Container size="80vw">
      <Title>Course / Loading ...</Title>
      <Divider mb="md" />
      <Stack>
        <CoursePlaceholder />
      </Stack>
    </Container>
  );
};

export default RouteLoading;
