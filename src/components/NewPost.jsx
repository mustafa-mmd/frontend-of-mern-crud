import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost({ refreshRef }) {
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const newPostData = {
      title: evt.target.title.value,
      description: evt.target.description.value,
      imageUrl: evt.target.imageUrl.value,
      author: evt.target.author.value,
      read_time: evt.target.read_time.value,
    };

    try {
      await axios.post("/new-blog", newPostData);
      console.log("Post created successfully");

      // Clear form
      evt.target.reset();

      // Optional: Refresh post list
      if (refreshRef?.current) {
        refreshRef.current();
      }

      // Navigate to Home
      navigate("/home");
    } catch (err) {
      console.error("Error creating post", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create a New Blog Post
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="read_time" className="block text-sm font-medium text-gray-700 mb-1">
            Read Time (mins)
          </label>
          <input
            type="number"
            id="read_time"
            name="read_time"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-xl hover:bg-orange-700 transition-all"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default NewPost;

