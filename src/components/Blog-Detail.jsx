import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function BlogDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Handle Delete

  function HandleDelete() {
    axios
      .delete(`http://localhost:3000/blog/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Blog not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-700 transition"
        >
          &lt; Back
        </button>

        {/* Blog Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>
                By{" "}
                <span className="font-medium text-gray-700">{blog.author}</span>
              </p>
              <p>
                {blog.createdAt} • {blog.read_time} mints read
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">{blog.description}</p>
            <div className="flex justify-between">
              <Link to={`/blog/${blog._id}/edit`}>
                <button className="bg-green-600 text-white p-3 rounded-2xl hover:bg-green-700 cursor-pointer">
                  Edit Blog
                </button>
              </Link>
              <button
                className="bg-red-600 text-white p-3 rounded-2xl hover:bg-red-700 cursor-pointer"
                onClick={HandleDelete}
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
