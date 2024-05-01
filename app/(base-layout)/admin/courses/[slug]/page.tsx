import { PageParams } from '@/types/next';

type RoutePageProps = {
  slug: string;
};

const RoutePage = ({ params: { slug } }: PageParams<RoutePageProps>) => {
  return <h1>{slug}</h1>;
};

export default RoutePage;
