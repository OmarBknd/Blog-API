import { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

interface TinyMCEProps {
  value: string;
  onChange: (content: string) => void;
}

const Tinymce = ({ value, onChange }: TinyMCEProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  
  useEffect(() => {
    if (editorRef.current && editorRef.current.getContent() !== value) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  return (
    <Editor
      apiKey="5jiijuzpwlvt73jppjtioqjvsstty8zajoz9hat046ymzplp"
      onInit={(_, editor) => {
        editorRef.current = editor;
        editor.setContent(value); 
      }}
      onEditorChange={(newContent) => {
        if (editorRef.current) {
          onChange(newContent); 
        }
      }}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};

export default Tinymce;
