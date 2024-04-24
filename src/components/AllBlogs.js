import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogsFunction = () => {
    axios
      .get("http://localhost:3500/blog/getAllBlogs")
      .then(function (response) {
        setBlogs(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const onlytenletters = (data) => {
    if (data.length > 10) {
      // Extract the first 10 characters and append an ellipsis
      return data.substring(0, 10) + "...";
    } else {
      // If the paragraph is 10 characters or shorter, return it as is
      return data;
    }
  };

  useEffect(() => {
    getAllBlogsFunction();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              By {blog.author} on{" "}
              {moment(blog.timestamp.updatedAt).format("lll")}
            </p>
            <p className="text-gray-700">{onlytenletters(blog.content)}</p>

            <Link
              to={`/singleBlogPage/${blog._id}`}
              state={{
                title: blog.title,
                content: blog.content,
                author: blog.author,
                date: moment(blog.timestamp.updatedAt).format("lll"),
              }}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
      <Link to="/createBlog">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto mt-10 w-full"
        >
          Create Blog
        </button>
      </Link>
    </div>
  );
};

export default BlogPage;
