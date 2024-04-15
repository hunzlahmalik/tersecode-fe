import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";

export type CodeEditorProps = ReactCodeMirrorProps & {
  value: string;
  setValue: (value: string) => void;
};

export const CodeEditor = ({ value, setValue, ...props }: CodeEditorProps) => {
  return (
    <ReactCodeMirror
      height="100%"
      value={value}
      onChange={(_value) => setValue(_value)}
      extensions={[python(), cpp(), javascript()]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};
