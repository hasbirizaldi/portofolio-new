import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

const TextEditor = ({ onChange }) => {
  const initialConfig = {
    namespace: "TextEditor",
    onError: (error) => console.error(error),
  };

  const handleChange = (editorState, editor) => {
    editorState.read(() => {
      const html = editor.getRootElement()?.innerHTML || "";
      onChange(html);
    });
  };

  return (
    <div className="border border-gray-300 rounded-md p-3 bg-white dark:bg-slate-900 text-black dark:text-white">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[100px]  outline-none px-2" />}
          placeholder={<div className="text-gray-400 dark:text-gray-500">Tulis sesuatu di sini...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
    </div>
  );
};

export default TextEditor;
