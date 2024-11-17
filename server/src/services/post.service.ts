import Post from "@models/post.model";

class PostService {
  async create(payload: any) {
    const newPost = await Post.create(payload);
    return newPost;
  }
}

export const postService = new PostService();
export default postService;
