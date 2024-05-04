import React from 'react';
import { z } from 'zod';

export const NavigationLinkWithGroupSchema = z.object({
  title: z.string(),
  links: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
      icon: z.custom<React.ReactNode>(),
      auth: z.boolean().optional(),
    }),
  ),
});

export type NavigationLinkWithGroupType = z.infer<
  typeof NavigationLinkWithGroupSchema
>;
