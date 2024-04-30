import { NavigationLinksType } from '@/lib/Zod/NavigationLinks.schema';
import { IconHome } from '@tabler/icons-react';

export const HeaderLinks: NavigationLinksType = [
  {
    label: 'Home',
    href: '/',
    icon: <IconHome />,
    auth: false,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: <IconHome />,
    auth: false,
  },
  {
    label: 'Contacts',
    href: '/contacts',
    icon: <IconHome />,
    auth: false,
  },
  {
    label: 'Support',
    href: '/support',
    icon: <IconHome />,
    auth: false,
  },
];
