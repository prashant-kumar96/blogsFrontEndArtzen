import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
const SingleBlogPage = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const { id } = useParams();
  const [blog, setBlog] = useState(state);

  const handleDelete = () => {
    const apiUrl = `http://localhost:3500/blog/deleteBlog?id=${id}`;
    axios
      .delete(apiUrl)
      .then(function (response) {
        if (response.data.message === "Blog Deleted Successfully") {
          alert(response.data.message);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <article className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-3xl font-semibold mb-4">{blog?.title}</h1>
        <div className="flex items-center mb-4">
          <p className="text-gray-600 text-sm mr-4">By {blog?.author} on</p>
          <p className="text-gray-600 text-sm">{blog?.date}</p>
        </div>
        <p className="text-gray-700 mb-8">{blog?.content}</p>
        <div className="flex justify-between">
          <Link
            to="/createBlog"
            state={{
              id: id,
              title: blog.title,
              content: blog.content,
              author: blog.author,
              mode: "edit",
            }}
            className="text-blue-600 hover:underline"
          >
            Edit Blog
          </Link>

          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Delete blog
          </button>
        </div>
      </article>
    </div>
  );
};

export default SingleBlogPage;
