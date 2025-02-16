import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tinymce from "../Tinymce";
import { postCreate } from "../../api/post";

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
    try {
      await postCreate(postData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create a New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter post title"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Content
            </label>
            <Tinymce value={newPost.content} onChange={handleEditorChange} />
          </div>

         
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;
