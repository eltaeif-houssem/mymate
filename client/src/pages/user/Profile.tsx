import React, { useEffect, useState } from "react";
import Header from "@components/headers/Header";
import profilePic from "@assets/profile-1.png";
import coverPic from "@assets/soft-pink-free-solidcolor-background.jpg";
import profileService from "@services/profile.service";
import { useAppContext } from "@context/context";
import LoadingSpinner from "@components/spinners/LoadingSpinner";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const { authStore } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>();
  const [bioForm, setBioForm] = useState<boolean>(false);
  const [facebookInput, setFacebookInput] = useState<boolean>(false);
  const [twitterInput, setTwitterInput] = useState<boolean>(false);
  const [instagramInput, setInstagramInput] = useState<boolean>(false);
  const [linkedinInput, setLinkedinInput] = useState<boolean>(false);

  const handleCoverImageChange = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("cover", file);
    const access_token = localStorage.getItem("access_token");
    const response = await profileService.updateCover(
      formData,
      `${access_token}`
    );
    if (!response.error) {
      setProfile((state: any) => ({
        ...state,
        backgroundPicture: response.data,
      }));
    }
  };

  const handleProfileImageChange = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    const access_token = localStorage.getItem("access_token");
    const response = await profileService.updateAvatar(
      formData,
      `${access_token}`
    );
    if (!response.error) {
      setProfile((state: any) => ({
        ...state,
        profilePicture: response.data,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");
      const response = await profileService.fetchProfile(
        `${authStore.auth.user?._id}`,
        `${access_token}`
      );

      setProfile(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateBio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bioValue = (
      event.currentTarget.elements.namedItem("bio") as HTMLInputElement
    ).value;
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("bio", bioValue);
    const response = await profileService.updateProfile(
      `${profile.user}`,
      formData,
      `${access_token}`
    );
    if (!response.error) {
      setProfile((state: any) => ({ ...state, bio: bioValue }));
      toast.success("bio was updated");
    } else {
      toast.error("cannot update the bio");
    }
    setBioForm(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen pb-24 bg-blue-50">
      <Header value="" onChange={() => {}} onClick={() => {}} />

      <main className="pt-20">
        {/* Cover Image Section */}
        <div className="relative h-56 bg-red-200">
          <div className="relative h-56">
            <img
              src={
                profile.backgroundPicture
                  ? `http://localhost:8080/api/v1/profile/cover/${profile.backgroundPicture}`
                  : coverPic
              }
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
                src={
                  profile.profilePicture
                    ? `http://localhost:8080/api/v1/profile/avatar/${profile.profilePicture}`
                    : profilePic
                }
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

        {/* hey bros */}
        <div className="w-full">
          <div className="w-96 pt-20 pl-6">
            <h3 className="text-xl font-semibold mb-2">Bio</h3>
            {!bioForm && (
              <div>
                {profile.bio && <p>{profile.bio}</p>}
                <button
                  className="w-full mt-4 bg-blue-400 py-1.5 rounded-md text-white duration-200 hover:opacity-90"
                  onClick={() => setBioForm(true)}
                >
                  {!profile.bio ? "Add Bio" : "Edit Bio"}
                </button>
              </div>
            )}

            {bioForm && (
              <form onSubmit={updateBio}>
                <textarea
                  placeholder="Enter a bio"
                  defaultValue={profile.bio}
                  name="bio"
                  className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-red-400 py-1.5 rounded-md text-white duration-200 hover:opacity-90"
                >
                  Update Bio
                </button>
              </form>
            )}
          </div>
          <div className="w-96 pl-6 mt-4">
            <h3 className="text-xl font-semibold mb-2">Profile Infos</h3>

            <form className="flex items-center mb-3">
              <input
                type="text"
                disabled={!facebookInput}
                placeholder="Facebook link"
                className="w-full py-2 px-2 rounded-md"
              />
              {!facebookInput && (
                <button
                  type="button"
                  onClick={() => setFacebookInput((state) => !state)}
                  className="px-3 py-2 ml-2 bg-blue-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-pen" />
                </button>
              )}

              {facebookInput && (
                <button
                  type="submit"
                  className="px-3 py-2 ml-2 bg-red-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-floppy-disk" />
                </button>
              )}
            </form>

            <form className="flex items-center mb-3">
              <input
                type="text"
                disabled={!twitterInput}
                placeholder="Twitter link"
                className="w-full py-2 px-2 rounded-md"
              />
              {!twitterInput && (
                <button
                  type="button"
                  onClick={() => setTwitterInput((state) => !state)}
                  className="px-3 py-2 ml-2 bg-blue-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-pen" />
                </button>
              )}

              {twitterInput && (
                <button
                  type="submit"
                  className="px-3 py-2 ml-2 bg-red-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-floppy-disk" />
                </button>
              )}
            </form>

            <form className="flex items-center mb-3">
              <input
                type="text"
                disabled={!instagramInput}
                placeholder="Instagram link"
                className="w-full py-2 px-2 rounded-md"
              />
              {!instagramInput && (
                <button
                  type="button"
                  onClick={() => setInstagramInput((state) => !state)}
                  className="px-3 py-2 ml-2 bg-blue-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-pen" />
                </button>
              )}

              {instagramInput && (
                <button
                  type="submit"
                  className="px-3 py-2 ml-2 bg-red-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-floppy-disk" />
                </button>
              )}
            </form>

            <form className="flex items-center mb-3">
              <input
                type="text"
                disabled={!linkedinInput}
                placeholder="Linkedin link"
                className="w-full py-2 px-2 rounded-md"
              />
              {!linkedinInput && (
                <button
                  type="button"
                  onClick={() => setLinkedinInput((state) => !state)}
                  className="px-3 py-2 ml-2 bg-blue-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-pen" />
                </button>
              )}

              {linkedinInput && (
                <button
                  type="submit"
                  className="px-3 py-2 ml-2 bg-red-400 text-white rounded-md"
                >
                  <i className="fa-solid fa-floppy-disk" />
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
