import { NavigationLinksType } from '@/lib/Zod/NavigationLinks.schema';
import { NavigationLinksWithGroupType } from '@/lib/Zod/NavigationLinksWithGroup.schema';
import { IconBooks, IconHome } from '@tabler/icons-react';

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
  AdminCourses: {
    label: 'Courses',
    href: '/admin/courses',
    auth: true,
  },
  Course: {
    label: 'Course',
    href: '/course/{1}',
    auth: true,
  },
  AdminLessons: {
    label: 'Lessons',
    href: '/admin/courses/{1}/lessons',
    auth: true,
  },
  Explorer: {
    label: 'Explorer',
    icon: <IconBooks />,
    href: '/explorer',
    auth: false,
  },
};

export const HeaderLinks: NavigationLinksType = [LINKS.Home, LINKS.Explorer];

export const FooterLinks: NavigationLinksWithGroupType = [
  {
    title: 'About',
    links: [
      LINKS.Explorer,
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
