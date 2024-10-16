
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoApps } from "react-icons/io5";

// Define the props interface for the blog card
interface BlogcardProps {
  blogdata: {
    id: string;
    title: string;
    image: string;
    category: string;
  };
}

const Blogcard: React.FC<BlogcardProps> = ({ blogdata }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback image URL in case the main image fails to load
  const fallbackImage = 'https://example.com/fallback-image.jpg'; // Replace with an actual fallback image

  return (
    <div className="flex justify-center mt-12">
      <div className="w-4/5 md:w-3/5 lg:w-2/3 bg-white shadow-md overflow-hidden rounded-xl">
        {/* Link to the blog detail page */}
        <Link to={`/blog/${blogdata.id}`}>
          <div className="flex flex-col w-full">
            <img
              src={imageError ? fallbackImage : blogdata.image}
              alt={blogdata.title}
              className="w-full h-[150px] object-cover"
              onError={() => setImageError(true)} // Set image error state on error
            />
            <div className="p-2">
              <h5 className="mt-1 text-left">{blogdata.title}</h5>
              <p className="flex justify-start items-center opacity-70">
                <IoApps />
                <span className="text-sm text-left ml-2">{blogdata.category}</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Blogcard;
