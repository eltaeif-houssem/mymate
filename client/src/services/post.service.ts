import * as postApi from "@api/post.api";

class PostService {
  async createPost(body: any, access_token: string) {
    const formData = new FormData();
    formData.append("content", body.content);
    formData.append("postimage", body.postimage);

    try {
      const { data } = await postApi.createPost(formData, access_token);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }
}

export const postService = new PostService();
export default postService;
