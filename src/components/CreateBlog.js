import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState(state?.title ? state?.title : "");
  const [author, setAuthor] = useState(state?.author ? state?.author : "");
  const [content, setContent] = useState(state?.content ? state?.content : "");

  const runBlogCreateFunction = (data) => {
    let apiUrl = "";
    if (state?.mode === "edit") {
      apiUrl = "http://localhost:3500/blog/updateBlog";
      let newData = { ...data, _id: state.id };
      axios
        .put(apiUrl, newData)
        .then(function (response) {
          if (response.data.message === "Blog Updated Successfully") {
            alert(response.data.message);
            navigate("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      apiUrl = "http://localhost:3500/blog/createBlog";
      axios
        .post(apiUrl, data)
        .then(function (response) {
          if (response.data.message === "Blog Created Successfully") {
            alert(response.data.message);
            navigate("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      title,
      author,
      content,
    };

    runBlogCreateFunction(blogData);

    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create a New Blog
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500 h-32 resize-none"
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {state?.mode === "edit" ? "Edit Blog" : "Create Blog"}
          </button>
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-10 "
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogPage;
