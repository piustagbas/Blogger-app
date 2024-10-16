import React from "react";
import { IoApps } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const Layout = () => {
  const menu = [
    { text: "Nature", path: "/" },
    { text: "Travel", path: "/" },
    { text: "Technology", path: "/" },
    { text: "Politics", path: "/" },
  ];

  const data = [
    {
      id: "1",
      title: "First Blog Post",
      image: "/images/aquam.jpg",
      category: "Politics",
    },

    {
      id: "2",
      title: "First Blog Post",
      image: "/images/aquam.jpg",
      category: "Technolgy",
    },
    {
      id: "3",
      title: "First Blog Post",
      image: "/images/aquam.jpg",
      category: "Health",
    },
    {
      id: "4",
      title: "First Blog Post",
      image: "/images/aquam.jpg",
      category: "Politics",
    },
    {
      id: "3",
      title: "First Blog Post",
      image: "/images/aquam.jpg",
      category: "Politics",
    },
    {
      id: "3",
      title: "First Blog Post",
      image: "/images/aquam.jpg",
      category: "Politics",
    },
  ];
  return (
    <div>
      <div className="border-b">
        <div className="px-5 py-5 flex justify-between">
          <Link to="/home">
            <span className="font-extrabold text-2xl">BLOGGER</span>
          </Link>
          <div className="flex">
            <ul className="flex">
              {menu.map((x, i) => {
                return (
                  <li key={i}>
                    <Link
                      className="p-2 items-center justify-center flex"
                      to={`/?category=${x.text}`}
                    >
                      <span>{x.text}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <button className="bg-gray-500 text-white px-2 py-1 rounded">
              <Link to="/create">+ New Post</Link>
            </button>
          </div>
        </div>
      </div>
      {/* <Body></Body> */}

      <HeroSection/>

      <div className="flex mx-auto px-5 md:px-20 flex-col">
        <div className="mt-12  w-full min-h-[700px] flex flex-row ">
          {/* <Outlet></Outlet> */}

          <div className="w-[40%] min-h-[700px] mx-auto flex flex-col">
            <div className="grid grid-cols-3 gap-5">
              {data.map((d, i) => (
                <div key={i} className="flex flex-col border border-gray-400  rounded-lg m-2 hover:shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 ">
                  <img src={d.image} alt="" className="w-[70px] h-[50px] p-3" />
                  <div className="p-2 ml-2">
                    <h5 className="mt-1 text-left">{d.title}</h5>
                    <p className="flex justify-start items-center opacity-70">
                      <IoApps />
                      <span className="text-sm text-left ml-2">
                        {d.category}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
      <div className="flex mt-24 bg-gray-800">
        <div className="flex mx-auto px-20 py-20 items-center justify-center">
          <h3 className="text-gray-400">BLOGGER</h3>
        </div>
      </div>
    </div>
  );
};

export default Layout;
