import { IconLoader } from '@tabler/icons-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';

export type ServerMdxProps = {
  source: string;
  className?: string;
};

// * If you want to add custom component, such as an "EmailForm", you can add it to the MdxComponent object.
const MdxComponent = {} satisfies Record<string, React.ComponentType>;

export const ServerMdx = (props: ServerMdxProps) => {
  return (
    <Suspense fallback={<IconLoader />}>
      <RenderMdx {...props} />
    </Suspense>
  );
};

const RenderMdx = (props: ServerMdxProps) => {
  return <MDXRemote source={props.source} components={MdxComponent} />;
};
