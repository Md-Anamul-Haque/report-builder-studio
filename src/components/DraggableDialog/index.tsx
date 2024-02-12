import { Editor, OnMount } from "@monaco-editor/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import React, { FC, useCallback, useRef, useState } from "react";
import Draggable from "react-draggable";
// import { getObjectCompletionProvider } from "./completionProvider";
import * as monaco from "monaco-editor";
import { generateSuggestions } from "./completionProvider";
import { TextField } from "@mui/material";

type Props = {
  dataTargetCode: string;
  suggestionData?: any;
  onChange?: (code?: string) => void;
};

const DataTargetCodeEditor: FC<Props> = ({
  dataTargetCode,
  suggestionData,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dataTargetCode);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  // useEffect(() => {}, [editorRef]);
  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    if (editorRef.current) return;
    editorRef.current = editor;
    if (!suggestionData) return;

    // Register a completion item provider for JavaScript language
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        let suggestions: monaco.languages.CompletionItem[] = [];
        const wordInfo = model.getWordUntilPosition(position);
        const word = wordInfo && wordInfo.word;
        suggestions = generateSuggestions(
          suggestionData,
          "data",
          position,
          wordInfo
        );
        if (word?.startsWith("d")) {
          suggestions = generateSuggestions(
            suggestionData,
            "data",
            position,
            wordInfo
          );
        }
        return { suggestions };
      },
    });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubscribe = () => {
    if (onChange) {
      onChange(value);
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <div
        style={{
          position: "relative",
        }}
      >
        <TextField value={dataTargetCode} size="medium" />
        <Button
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          size="small"
          variant="contained"
          onClick={handleClickOpen}
          color="secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <Editor
            // defaultValue={dataTargetCode}
            height="400px"
            defaultLanguage="javascript"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            onChange={(code) => {
              setValue(code || "");
            }}
            value={value}
          />
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DataTargetCodeEditor;

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
