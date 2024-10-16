



import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBlogs } from "../Apis/api";
import Blogcard from "../components/Blogcard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Blog {
  id: string; // Make sure 'id' is included in the interface
  title: string;
  image: string;
  description: string;
  created_at: string;
  comments: string;
}

const Home = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allBlogs = await getBlogs(null);  // Fetch all blogs
        setBlogs(allBlogs.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="">
      <Navbar/>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {blogs && blogs.map((x, i) => (
          <Blogcard key={i} blogdata={x} /> // Each blog card is rendered
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

