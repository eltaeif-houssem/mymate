import axios from "./axios.api";

export const createPost = async (body: any, access_token: string) =>
  axios.post(`/post`, body, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
