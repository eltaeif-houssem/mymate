import axios from "./axios.api";

// update profile avatar pic
export const getProfile = async (id: string, access_token: string) =>
  axios.get(`/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

// update profile avatar pic
export const updateAvatar = async (body: any, access_token: string) =>
  axios.put(`/profile/avatar`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

// update profile cover pic
export const updateCover = async (body: any, access_token: string) =>
  axios.put(`/profile/cover`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
