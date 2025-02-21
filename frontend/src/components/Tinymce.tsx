import { Editor } from "@tinymce/tinymce-react";


type TinymceProps ={
  value: string;
  onChange: (content: string) => void;
}


const Tinymce = ({ value, onChange }: TinymceProps) => {
  //const editorRef = useRef<any>(null);

  return (
    <div className="w-full dark:bg-gray-700 rounded-2xl">
      <Editor
        apiKey="5jiijuzpwlvt73jppjtioqjvsstty8zajoz9hat046ymzplp"
        value={value}
        onEditorChange={(newContent) => onChange(newContent)}
        
        init={{
          
          content_css:'dark',
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
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " 
            
        }}
      />
    </div>
  );
};

export default Tinymce;