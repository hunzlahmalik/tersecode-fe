import MuiMarkdown, { MuiMarkdownProps } from "mui-markdown";

export type MarkdownProps = MuiMarkdownProps & {
  md: string;
};

export const Markdown = ({ md, ...props }: MarkdownProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiMarkdown {...props}>{md}</MuiMarkdown>;
};
