import { NavigationLinksType } from '@/lib/Zod/NavigationLinks.schema';
import { NavigationLinksWithGroupType } from '@/lib/Zod/NavigationLinksWithGroup.schema';
import { IconHome } from '@tabler/icons-react';

export const LINKS = {
  Home: {
    label: 'Home',
    href: '/',
    icon: <IconHome />,
    auth: false,
  },
  Account: {
    label: 'Account',
    href: '/account',
    icon: <IconHome />,
    auth: true,
  },
  Admin: {
    label: 'Admin',
    href: '/admin',
    auth: true,
  },
  Courses: {
    label: 'Courses',
    href: '/admin/courses',
    auth: true,
  },
};

export const HeaderLinks: NavigationLinksType = [LINKS.Home];

export const FooterLinks: NavigationLinksWithGroupType = [
  {
    title: 'About',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Forums', href: '#' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Contribute', href: '#' },
      { label: 'Media assets', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Releases', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Join Discord', href: '#' },
      { label: 'Follow on Twitter', href: '#' },
      { label: 'Email newsletter', href: '#' },
      { label: 'GitHub discussions', href: '#' },
    ],
  },
];
