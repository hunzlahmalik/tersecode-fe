import { Markdown } from "components/Markdown";

export const ProblemSolution = ({ statement }: { statement: string }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Markdown md={statement} />;
};
