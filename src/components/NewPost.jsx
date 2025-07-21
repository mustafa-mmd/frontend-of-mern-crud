import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    author: "",
    read_time: 0,
  });

  function HandleSubmit(evt) {
    try {
      evt.preventDefault();

      setFormData(() => {
        formData.title = evt.target.title.value;
        formData.description = evt.target.description.value;
        formData.imageUrl = evt.target.image.value;
        formData.author = evt.target.author.value;
        formData.read_time = evt.target.read_time.value;
      });

      axios
        .post("/new-blog", { formData })
        .then(() => console.log("data sended"))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
      evt.target.reset();
      navigate("/home");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={(e) => HandleSubmit(e)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create a New Blog Post
        </h2>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="read_time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Read Time (mins)
          </label>
          <input
            type="number"
            id="read_time"
            name="read_time"
            placeholder="Please enter read minutes"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            type="text"
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
