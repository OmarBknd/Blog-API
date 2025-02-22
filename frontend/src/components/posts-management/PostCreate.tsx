import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tinymce from "../Tinymce";
import { postCreate } from "../../api/post";
import toast from "react-hot-toast";
const PostCreate = () => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const authorId = localStorage.getItem("userId");

  const handleEditorChange = (newContent: string) => {
    setNewPost((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { ...newPost, authorId };
    return toast.promise(
      postCreate(postData) 
        .then(() => {
          setTimeout(() => navigate('/'), 2000);
        }),
      {
        loading: "Deleting post...",
        success: "Post created, wait for admin approval",
        error: "Failed to delete post.",
        
      },{
        duration:3000
      }
    );
  };

  return (
    <div className="flex items-center dark:bg-gray-900 dark:text-white justify-center min-h-screen bg-gray-100">
      <div className=" p-8 shadow-lg rounded-lg w-full dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold  mb-6 text-center">
          Create a New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block text-gray-700 dark:text-white text-lg font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  dark:text-white "
              placeholder="Enter post title"
            />
          </div>

          
          <div>
            <label className="block text-gray-700  dark:text-white text-lg font-medium mb-2">
              Content
            </label>
            <Tinymce value={newPost.content} onChange={handleEditorChange} />
          </div>

         
          <button
            type="submit"
            className="p-3 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition dark:hover:bg-indigo-700 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;
