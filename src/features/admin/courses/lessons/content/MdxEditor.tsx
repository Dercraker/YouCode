'use client';

import useNotify from '@/hooks/useNotify';
import { EditLessonContentType } from '@/lib/Zod/admin/course/lessons/EditLessonContent.schema';
import {
  SyncStateSchema,
  SyncStateType,
} from '@/lib/Zod/admin/courses/lessons/edit/SyncState.schema';
import { EditLessonContentAction } from '@/lib/server-actions/admin/courses/lessons/EditLessonContent.action';
import { Badge, Box } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import InitializedMDXEditor from './InitializedMDXEditor';

interface MdxEditorProps {
  lessonId: string;
  markdown: string;
}

const MdxEditor = ({ markdown, lessonId }: MdxEditorProps) => {
  const [syncState, setSyncState] = useState<SyncStateType>(
    SyncStateSchema.enum.Sync,
  );

  const GetBadgeColor = (syncState: SyncStateType) => {
    switch (syncState) {
      case SyncStateSchema.enum.Sync:
        return 'teal';
      case SyncStateSchema.enum.Syncing:
        return 'orange';
      case SyncStateSchema.enum['Not-Sync']:
        return 'red';
      case SyncStateSchema.enum.Error:
        return 'red';
    }
  };

  const { ErrorNotify } = useNotify();

  const { mutate } = useMutation({
    mutationFn: async (newMarkdown: EditLessonContentType) =>
      await EditLessonContentAction(newMarkdown),
    onSuccess({ data, serverError }) {
      if (serverError || !data) {
        ErrorNotify({ title: serverError || 'Error' });
        setSyncState(SyncStateSchema.enum.Error);
        return;
      }

      setSyncState(SyncStateSchema.enum.Sync);
    },
  });

  const [debouncedMarkdown, setValue] = useDebouncedState(markdown, 500);

  useEffect(() => {
    (async () => {
      setSyncState(SyncStateSchema.enum.Syncing);
      await mutate({
        id: lessonId,
        markdown: debouncedMarkdown,
      });
    })();
  }, [debouncedMarkdown]);

  return (
    <Box pos="relative">
      <Box
        style={{ zIndex: 999, bottom: '20px', right: '20px' }}
        pos={'absolute'}>
        <Badge color={GetBadgeColor(syncState)}>{syncState}</Badge>
      </Box>
      <InitializedMDXEditor
        markdown={markdown}
        onChange={md => {
          setSyncState(SyncStateSchema.enum['Not-Sync']);
          setValue(md);
        }}
      />
    </Box>
  );
};

export default MdxEditor;
