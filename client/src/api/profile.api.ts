import axios from "./axios.api";

// update profile avatar pic
export const updateAvatar = async (body: any, id: string) =>
  axios.put(`/profile/avatar/:id${id}`, body);

// update profile cover pic
export const updateCover = async (body: any, id: string) =>
  axios.put(`/profile/cover/${id}`, body);
