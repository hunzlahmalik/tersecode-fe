import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";

export type CodeEditorProps = ReactCodeMirrorProps & {
  value: string;
  setValue: (value: string) => void;
};

export const CodeEditor = ({ value, setValue, ...props }: CodeEditorProps) => {
  return (
    <ReactCodeMirror
      height="85vh"
      value={value}
      onChange={(_value) => setValue(_value)}
      extensions={[python(), cpp()]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
