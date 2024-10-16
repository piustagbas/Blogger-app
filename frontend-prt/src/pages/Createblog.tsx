


import axios from 'axios';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { createBlog } from "../Apis/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loading } from '../components/Loading';

const Createblog = () => {
  const blankBlog = {
    title: "",
    image: null as File | null,
    post: "<p><br></p>",
    category: "",
  };

  const [newBlog, setNewBlog] = useState(blankBlog);
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]); // State for storing blog posts
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access the current location

  const menu = [
    { text: "Nature", path: "/" },
    { text: "Travel", path: "/" },
    { text: "Technology", path: "/" },
    { text: "Politics", path: "/" },
  ];

  // Fetch blog posts based on category from URL
  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams(location.search);
      const category = params.get("category");
      if (category) {
        try {
          const response = await axios.get(`/api/posts?category=${category}`); // Adjust your API endpoint accordingly
          setBlogPosts(response.data); // Set the fetched posts
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [location.search]); // Run effect when category changes

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewBlog({ ...newBlog, image: file });
    } else {
      console.error("No file selected");
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("post", newBlog.post);
    formData.append("category", newBlog.category);
    if (newBlog.image) {
      formData.append("image", newBlog.image);
    } else {
      console.error("Image file is missing");
      return;
    }

    try {
      setLoading(true);
      const createdBlog = await createBlog(formData);
      if (createdBlog && createdBlog.desc === 1) {
        setNewBlog(blankBlog);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating blog:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative ${loading ? 'bg-black' : ''}`}>
      <div className="border-b">
        <div className="px-5 py-5 flex justify-between">
          <Link to='/home'>
            <span className='font-extrabold text-2xl'>BLOGGER</span>
          </Link>
          <div className='flex'>
            <ul className='flex'>
              {menu.map((x, i) => (
                <li key={i}>
                  <Link className='p-2 items-center justify-center flex' to={`/?category=${x.text}`}>
                    <span>{x.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button className='bg-gray-500 text-white px-2 py-1 rounded'>
              <Link to='/home'>Home</Link>
            </button>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      
      <div className="flex w-full items-center justify-center">
        <div className="bg-slate-200 w-[60%] p-5 rounded-xl">
          <h1 className="text-2xl mb-5">Create Blog Post</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col">
              <label htmlFor="" className="ml-1 text-gray-500">Title</label>
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="h-10 border border-gray-300 rounded my-2 p-2"
              />
              <label htmlFor="" className="ml-1 text-gray-500">Category</label>
              <select
                value={newBlog.category}
                onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                className="h-10 border border-gray-300 rounded my-2 p-2"
              >
                <option value="" disabled>Select Category</option>
                {menu.map((x) => (
                  <option key={x.text} value={x.text}>{x.text}</option>
                ))}
              </select>
              <label htmlFor="" className="ml-1 text-gray-500">Image</label>
              <input
                onChange={handleUpload}
                type="file"
                className="border-gray-300 rounded my-2 p-2"
              />
              <label htmlFor="" className="ml-1 text-gray-500">Post</label>
              <ReactQuill
                className="bg-white rounded mb-2 mt-2 editingarea"
                theme="snow"
                value={newBlog.post}
                onChange={(e) => setNewBlog({ ...newBlog, post: e })}
              />
              <hr />
              <Link
                to="/home"
                onClick={handleSubmit}
                className="bg-gray-500 text-white h-8 w-[100px] mt-2 rounded text-center inline-block"
              >
                {loading ? "Submitting..." : "Submit"}
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="flex mt-24 bg-gray-800">
        <div className="flex mx-auto px-20 py-20 items-center justify-center">
          <h3 className="text-gray-400">BLOGGER</h3>
        </div>
      </div>

      {/* Display blog posts for the selected category */}
      {/* <div className="mt-5">
        <h2 className="text-xl font-bold">Posts in Selected Category:</h2>
        {blogPosts.length > 0 ? (
          <ul>
            {blogPosts.map((post) => (
              <li key={post.id} className="my-2 p-2 border rounded">
                <h3 className="font-semibold">{post.title}</h3>
                <p>{post.post}</p>
                <p className="text-gray-500">{post.category}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found in this category.</p>
        )}
      </div> */}
    </div>
  );
};

export default Createblog;
