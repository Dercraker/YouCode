'use client';

import { LessonStateType } from '@/lib/Zod/admin/course/lessons/LessonsState.schema';
import { LessonStateSchema } from '@/lib/Zod/lesson/LessonState.schema';
import { Combobox, Group, InputBase, useCombobox } from '@mantine/core';
import { IconEyeOff, IconUsers, IconWifi } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export type LessonStateSelectorProps = {
  label?: string;
  defaultValue?: LessonStateType;
  selectedValue: (value: string) => void;
};

const lessonStates: { name: string; icon: JSX.Element }[] = [
  { name: LessonStateSchema.enum.HIDDEN.toString(), icon: <IconEyeOff /> },
  { name: LessonStateSchema.enum.PUBLIC.toString(), icon: <IconUsers /> },
  { name: LessonStateSchema.enum.PUBLISHED.toString(), icon: <IconWifi /> },
];

export const LessonStateSelector = ({
  selectedValue,
  defaultValue,
  label,
}: LessonStateSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    if (!value) return;
    setIsLoaded(true);

    if (defaultValue) {
      if (!isLoaded) return;
      selectedValue(value);
    } else selectedValue(value);
  }, [value]);

  const options = lessonStates.map(item => (
    <Combobox.Option value={item.name} key={item.name}>
      <Group gap="xs">
        {item.icon}
        <span>{item.name}</span>
      </Group>
    </Combobox.Option>
  ));
  return (
    <>
      <Combobox
        store={combobox}
        onOptionSubmit={val => {
          setValue(val);
          combobox.closeDropdown();
        }}>
        <Combobox.Target>
          <InputBase
            label={label ? label : undefined}
            component="button"
            type="button"
            withAsterisk
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}>
            {value}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
