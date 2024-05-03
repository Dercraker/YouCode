import { Paper } from '@mantine/core';
import MdxEditor from './content/MdxEditor';

interface EditLessonContentCardProps {
  lessonId: string;
  markdown: string;
}

const EditLessonContentCard = ({
  lessonId,
  markdown,
}: EditLessonContentCardProps) => {
  return (
    <Paper shadow="xl" m="md" p="xl" withBorder flex={3} miw="600">
      <MdxEditor markdown={markdown} lessonId={lessonId} />
    </Paper>
  );
};

export default EditLessonContentCard;
