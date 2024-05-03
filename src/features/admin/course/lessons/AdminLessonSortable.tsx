'use client';

import useNotify from '@/hooks/useNotify';
import { LessonsType } from '@/lib/Zod/admin/course/lessons/Lessons.schema';
import { LessonMoveType } from '@/lib/Zod/admin/courses/lessons/LessonMove.schema';
import { LessonMoveAction } from '@/lib/server-actions/admin/courses/lessons/LessonMove.action';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, LoadingOverlay } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminLessonListSortableItem from './AdminLessonListSortableItem';

interface AdminLessonSortableProps {
  lessons: LessonsType;
}

const AdminLessonSortable = ({
  lessons: defaultItems,
}: AdminLessonSortableProps) => {
  const { ErrorNotify } = useNotify();
  const [items, setItems] = useState<LessonsType>(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      courseId,
      lessonId,
      downItemRank,
      upItemRank,
    }: LessonMoveType) =>
      await LessonMoveAction({
        courseId,
        lessonId,
        upItemRank,
        downItemRank,
      }),
    onSuccess({ data, serverError }, { lessonId }, _) {
      if (serverError) return ErrorNotify({ title: serverError });
      if (!data) return;

      router.refresh();

      setItems(prev => {
        const activeItem = prev.find(item => item.id === lessonId);
        if (!activeItem) return prev;

        activeItem.rank = data;

        return [...prev];
      });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      ErrorNotify({ title: 'Invalid drop target' });
      return;
    }

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        const newUpItem = newItems[newIndex - 1]?.rank;
        const newDownItem = newItems[newIndex + 1]?.rank;

        mutate({
          courseId: newItems[0].course.id,
          lessonId: String(active.id),
          upItemRank: newUpItem,
          downItemRank: newDownItem,
        });

        return newItems;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
      <Box pos="relative">
        <SortableContext
          disabled={isPending}
          items={items}
          strategy={verticalListSortingStrategy}>
          {items.map(lesson => (
            <AdminLessonListSortableItem key={lesson.id} lesson={lesson} />
          ))}
        </SortableContext>
        <LoadingOverlay
          visible={isPending}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      </Box>
    </DndContext>
  );
};

export default AdminLessonSortable;
