'use client';

import CoursePlaceholder from '@/components/loader/course/Course.loader';
import { Modal, Title } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const RouteLoading = () => {
  return (
    <Modal.Root opened onClose={() => {}} centered size="72em">
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Title>Course / Loading ....</Title>
          </Modal.Title>
          <Modal.CloseButton icon={<IconX />} />
        </Modal.Header>
        <Modal.Body>
          <CoursePlaceholder />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RouteLoading;
