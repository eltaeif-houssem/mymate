import React from "react";
import Header from "@components/headers/Header";

import profilePic from "@assets/profile-1.png";

const Profile: React.FC = () => {
  return (
    <div className="w-full h-screen bg-blue-50">
      <Header value="" onChange={() => {}} onClick={() => {}} />
      <div className="w-full h-screen pt-20">
        <div className="w-full h-56 bg-red-200 relative">
          <div className="w-full h-56 relative">
            <img
              src="https://files.123freevectors.com/wp-content/solidbackground/soft-pink-free-solidcolor-background.jpg"
              alt="cover-bg"
              className="w-full h-full bg-cover"
            />
            <i className="fa-solid fa-pen absolute bottom-3 text-xs right-3 bg-white py-1.5 px-2 text-gray-500 rounded-full cursor-pointer border-gray-500 border-2" />
          </div>
          <div className="absolute left-24 -translate-y-16">
            <img
              src={profilePic}
              alt="profile-pic"
              className="w-32 rounded-full"
            />
            <i className="fa-solid fa-pen absolute bottom-2 text-xs -right-0 bg-white py-1.5 px-2 text-gray-500 rounded-full cursor-pointer border-gray-500 border-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
