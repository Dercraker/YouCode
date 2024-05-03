import { PageParams } from '@/types/next';

type RoutePageProps = {
  courseId: string;
  lessonId: string;
};

const RoutePage = ({
  params: { courseId, lessonId },
}: PageParams<RoutePageProps>) => {
  return <h1>LessonPage</h1>;
};

export default RoutePage;
