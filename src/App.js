import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBlogs from "./components/AllBlogs";
import CreateBlogPage from "./components/CreateBlog";
import SingleBlogPage from "./components/SingleBlogPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/createBlog" element={<CreateBlogPage />} />
        <Route path="/singleBlogPage/:id" element={<SingleBlogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
