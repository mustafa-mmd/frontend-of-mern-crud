
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const [Blogs, setBlogs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/blogs")
      .then((res) => {
        const fetchedBlogs = res.data;

        // Check if there is a newly created blog
        if (location.state?.newBlog) {
          setBlogs([location.state.newBlog, ...fetchedBlogs]);
        } else {
          setBlogs(fetchedBlogs);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [location.state]);
  return (
    <>
      <p className="m-2.5 text-gray">click on Image see more details</p>
      <div className="flex justify-center flex-wrap gap-x-5 gap-y-3 m-0 p-7">
        {Blogs.length > 0 ? (
          Blogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="h-[350px] w-96 bg-slate-200 rounded-4xl posts"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="rounded-t-4xl w-full"
              />
              <div className="p-3 font-bold">
                <h2 className="text-3xl">{blog.title}</h2>
                <h2 className="text-xl font-semibold">
                  Author : <span className="text-red-600">{blog.author}</span>
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <h1>No Blogs Found</h1>
        )}
      </div>
    </>
  );
}

export default Home;
