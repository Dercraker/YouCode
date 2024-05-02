'use client';

import {
  CourseSateSchema,
  CourseSateType,
} from '@/lib/Zod/admin/course/CourseState.schema';
import { Combobox, Group, InputBase, useCombobox } from '@mantine/core';
import { IconNotes, IconPencil } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export type CouseStateSelectorProps = {
  label?: string;
  defaultValue?: CourseSateType;
  selectedValue: (value: string) => void;
};

const transportModes: { name: string; icon: JSX.Element }[] = [
  { name: CourseSateSchema.enum.DRAFT.toString(), icon: <IconPencil /> },
  { name: CourseSateSchema.enum.PUBLISHED.toString(), icon: <IconNotes /> },
];

export const CouseStateSelector = ({
  selectedValue,
  defaultValue,
  label,
}: CouseStateSelectorProps) => {
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

  const options = transportModes.map(item => (
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
