import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

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

const TextWrapper = styled("span")(
  ({ theme }) => `
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${theme.palette.common.black}
        }

        &-primary {
          color: ${theme.palette.primary.main}
        }
        
        &-secondary {
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          color: ${theme.palette.error.main}
        }
        
        &-info {
          color: ${theme.palette.info.main}
        }
      }
`
);

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
