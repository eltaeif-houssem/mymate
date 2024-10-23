import React from "react";
import Header from "@components/headers/Header";
import { Link, useNavigate } from "react-router-dom";
import * as routePaths from "@constants/route-urls.constant";

import profilePic from "@assets/profile-1.png";
import { useAppContext } from "@/context/context";

const Home = () => {
  const { authStore } = useAppContext();
  const [search, setSearch] = React.useState<string>("");
  const navigate = useNavigate();

  // handle search button clicking
  const searchHandler = () => {};

  const logoutHandler = () => {
    authStore.signout();
    navigate(routePaths.AUTH_SIGNIN);
  };

  return (
    <div className="w-full min-h-screen bg-blue-50">
      <Header
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onClick={searchHandler}
      />

      <div className="w-full min-h-screen flex pt-20 relative">
        <div className="bg-white w-64 h-[calc(100vh-5rem)] flex flex-col justify-between">
          <div className="w-full h-full flex flex-col py-8 px-6">
            <Link
              to="/"
              className="flex flex-col items-center duration-200 hover:opacity-80"
            >
              <img src={profilePic} alt="profile-pic" />
              <p className="font-bold text-lg text-center mt-2">Steve Rogers</p>
            </Link>

            <div className="mt-8">
              <p className="text-left text-red-500 text-xl font-semibold">
                Explore Pannel
              </p>
              <Link
                to="/"
                className="flex items-center mt-4 duration-200 hover:opacity-80"
              >
                <i className="fa-solid fa-user bg-blue-300 py-1.5 px-2.5 rounded-md text-xs" />
                <p className="text-lg ml-2 font-semibold">Profile</p>
              </Link>

              <Link
                to="/"
                className="flex items-center mt-4 duration-200 hover:opacity-80"
              >
                <i className="fa-solid fa-user-group bg-blue-300 py-1.5 px-2 rounded-md text-xs" />
                <p className="text-lg ml-2 font-semibold">Find Friends</p>
              </Link>

              <Link
                to="/"
                className="flex items-center mt-4 duration-200 hover:opacity-80"
              >
                <i className="fa-solid fa-gear bg-blue-300 py-1.5 px-2.5 rounded-md text-xs" />
                <p className="text-lg ml-2 font-semibold">Settings</p>
              </Link>
            </div>
          </div>
          <button
            className="bg-red-500 mb-8 w-52 ml-auto mr-auto text-white font-semibold py-2 rounded-md duration-200 hover:opacity-80"
            onClick={logoutHandler}
          >
            <i className="fa-solid fa-right-from-bracket mr-2" />
            Logout
          </button>
        </div>
        <div className="flex-1"></div>
        <div className="bg-white w-72 h-[calc(100vh-5rem)] flex flex-col justify-between">
          <p className="text-left text-red-500 text-xl font-semibold p-4">
            People you may know
          </p>

          <div className="flex-1 flex-col px-4">
            <div className="flex items-center mt-4">
              <Link to="/">
                <img
                  src={profilePic}
                  alt="user-pic"
                  className="w-14 h-12 duration-200 hover:opacity-80"
                />
              </Link>
              <div className="ml-2">
                <p className="font-bold">Tony Stark</p>
                <button className="bg-blue-400 text-white px-6 py-1 text-sm rounded-md duration-200 hover:opacity-80">
                  follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
