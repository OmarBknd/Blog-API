import { Editor } from "@tinymce/tinymce-react";
const apiKey = import.meta.env.VITE_TINYMCE_SECRET_KEY;



type TinymceProps ={
  value: string;
  onChange: (content: string) => void;
}


const Tinymce = ({ value, onChange }: TinymceProps) => {
  //const editorRef = useRef<any>(null);

  return (
    <div className="w-full dark:bg-gray-700 rounded-2xl">
      <Editor
        apiKey={apiKey || 'your-api-key'}
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