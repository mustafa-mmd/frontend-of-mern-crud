import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();

  //   Data fetch
  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        setBlog(false);
        console.log(err.message);
      });
  }, [id]);

  //   Update Blog

  function HandleUpdate(evt) {
    evt.preventDefault();
    const data = {
      title: evt.target.title.value,
      imageUrl: evt.target.image.value,
      author: evt.target.author.value,
      read_time: evt.target.read_time.value,
      description: evt.target.description.value,
    };
    axios
      .patch(`http://localhost:3000/blog/${id}/edit`, data)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {blog === false ? (
        <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
          Blog not found!
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <form
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
            onSubmit={(event) => HandleUpdate(event)}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Edit: {blog.title}
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
                defaultValue={blog.title}
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
                defaultValue={blog.imageUrl}
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
                defaultValue={blog.author}
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
                defaultValue={blog.read_time}
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
                defaultValue={blog.description}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-xl  cursor-pointer hover:bg-orange-700 transition-all"
            >
              Edit Blog
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditBlog;
