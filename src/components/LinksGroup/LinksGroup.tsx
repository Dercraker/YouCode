import { NavigationLinksType } from '@/lib/Zod/NavigationLinks.schema';
import { Text } from '@mantine/core';
import Link from 'next/link';
import classes from './LinksGroup.module.css';

export interface LinksGroupProps {
  title: string;
  data: NavigationLinksType;
}

const LinksGroup = ({ data, title }: LinksGroupProps) => {
  const links = data.map((link, index) => (
    <Text
      className={classes.link}
      component={Link as unknown as 'a'}
      href={link.href}
      key={index}>
      {link.label}
    </Text>
  ));

  return (
    <div className={classes.wrapper}>
      <Text className={classes.title}>{title}</Text>
      {links}
    </div>
  );
};

export default LinksGroup;
