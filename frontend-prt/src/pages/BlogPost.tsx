

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';  // Ensure dateformat is installed
import parse from 'html-react-parser';  // Ensure html-react-parser is installed
import axios from 'axios'; // Ensure axios is imported
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Blog {
    title: string;
    created_at: string;
    image: string;
    post: string;
}

const Blog: React.FC = () => {
    const apiURL = 'http://localhost:3001/blog'; // Adjusted API URL
    let { id } = useParams<{ id: string }>();  // Fetch blog id from URL parameters
    const [blog, setBlog] = useState<Blog | null>(null);  // Blog state initialized as null

    useEffect(() => {
        async function fetchData() {
            if (id) {
                try {
                    const response = await axios.get(`${apiURL}/${id}`);  // Fetch blog by id
                    setBlog(response.data.data);  // Access the blog data correctly
                } catch (error) {
                    console.error('Error fetching blog:', error);
                }
            }
        }
        fetchData();
    }, [id]);

    return (
      <div className='flex flex-col'>
        <Navbar/>
        <div className="flex justify-center items-center mt-12">
            {blog ? (  // Check if blog data is available
                <div className="flex flex-col w-[40%] overflow-hidden">
                    <h1 className="mt-1 text-3xl font-extrabold">{blog.title}</h1>
                    <div className="flex mt-4 mb-4">
                        <small>{dateFormat(blog.created_at, "mmmm dS, yyyy, h:MM TT")}</small>
                    </div>
                    <img className="rounded-lg" src={blog.image} alt="Blog cover" />
                    <div className='mt-4'>
                        {parse(blog.post)}  {/* Parse and render the blog content */}
                    </div>
                </div>
            ) : (
                <div>Loading...</div> // Show loading indicator while fetching
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default Blog;



