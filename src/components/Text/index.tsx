import { FC, ReactNode } from "react";
import clsx from "clsx";
import { TextWrapper } from "./styled";

interface TextProps {
  className?: string;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "black";
  flex?: boolean;
  children?: ReactNode;
}

const Text: FC<TextProps> = ({
  className,
  color = "secondary",
  flex,
  children,
  ...rest
}) => {
  return (
    <TextWrapper
      className={clsx(`MuiText-${color}`, { flexItem: flex })}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </TextWrapper>
  );
};

export default Text;
