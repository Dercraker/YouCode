import Markdown from 'react-markdown';

interface MarkdownProseProps {
  markdown: string;
}

const MarkdownProse = ({ markdown }: MarkdownProseProps) => {
  return <Markdown>{markdown}</Markdown>;
};

export default MarkdownProse;
