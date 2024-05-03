'use client';

import { CourseByIdType } from '@/lib/Zod/course/CourseById.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { Modal, Title } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface CourseDialogProps {
  course: CourseByIdType;
}

const CourseDialog = ({
  course,
  children,
}: PropsWithChildren<CourseDialogProps>) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <Modal.Root
      opened={path.endsWith(LINKS.Course.href.replace('{1}', course.id))}
      onClose={router.back}
      centered
      size={'auto'}>
      <Modal.Overlay backgroundOpacity={0.55} blur={3} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Title>Course / {course?.name}</Title>
          </Modal.Title>
          <Modal.CloseButton icon={<IconX />} />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CourseDialog;
