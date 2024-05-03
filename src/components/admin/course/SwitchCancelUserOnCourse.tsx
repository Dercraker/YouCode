'use client';

import { SwitchCancelUserSchemaType } from '@/lib/Zod/admin/course/SwitchCancelUser.schema';
import { SwitchCancelUserAction } from '@/lib/server-actions/admin/course/SwitchCancelUser.action';
import { ActionIcon, Box, LoadingOverlay, Menu } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface SwitchCancelUserOnCourseProps {
  canceled: boolean;
  courseId: string;
  userId: string;
}

const SwitchCancelUserOnCourse = ({
  canceled,
  courseId,
  userId,
}: SwitchCancelUserOnCourseProps) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (switchCancel: SwitchCancelUserSchemaType) =>
      await SwitchCancelUserAction(switchCancel),
    onSuccess: () => router.refresh(),
  });

  return (
    <Menu
      width={300}
      position="bottom"
      transitionProps={{ transition: 'pop' }}
      withinPortal
      trigger="hover">
      <Menu.Target>
        <ActionIcon variant="subtle" size="lg">
          <IconMenu2 />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown w="5em">
        <Box pos="relative">
          <LoadingOverlay visible={isPending} loaderProps={{ size: 'sm' }} />
          <Menu.Item
            disabled={!canceled}
            onClick={() => mutate({ canceled: !canceled, courseId, userId })}>
            Enable
          </Menu.Item>
          <Menu.Item
            disabled={canceled}
            onClick={() => mutate({ canceled: !canceled, courseId, userId })}>
            Disable
          </Menu.Item>
        </Box>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SwitchCancelUserOnCourse;
