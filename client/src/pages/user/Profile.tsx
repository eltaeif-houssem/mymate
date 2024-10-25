import React, { useState } from "react";
import Header from "@components/headers/Header";
import profilePic from "@assets/profile-1.png";
import coverPic from "@assets/soft-pink-free-solidcolor-background.jpg";

const Profile: React.FC = () => {
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleCoverImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (event: any) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Header value="" onChange={() => {}} onClick={() => {}} />

      <main className="pt-20">
        {/* Cover Image Section */}
        <div className="relative h-56 bg-red-200">
          <div className="relative h-56">
            <img
              src={coverImage ? coverImage : coverPic}
              alt="Profile cover"
              className="w-full h-full object-cover"
            />
            <label
              htmlFor="cover-upload"
              className="absolute bottom-3 right-3 flex items-center gap-2 px-2 py-1.5 bg-white rounded-full border-2 border-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
              role="button"
              aria-label="Change cover photo"
            >
              <i className="fa-solid fa-camera w-4 h-4 text-gray-500" />
              <input
                type="file"
                id="cover-upload"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
              />
            </label>
          </div>

          {/* Profile Picture Section */}
          <div className="absolute left-24 -bottom-16">
            <div className="relative">
              <img
                src={profileImage ? profileImage : profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-2 right-0 flex items-center gap-2 px-2 py-1.5 bg-white rounded-full border-2 border-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                role="button"
                aria-label="Change profile picture"
              >
                <i className="fa-solid fa-camera w-4 h-4 text-gray-500" />
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
