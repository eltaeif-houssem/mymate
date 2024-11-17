import * as postApi from "@api/post.api";

class PostService {
  async createPost(body: any, access_token: string) {
    try {
      const { data } = await postApi.createPost(body, access_token);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }
}

export const postService = new PostService();
export default postService;
