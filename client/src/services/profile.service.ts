import * as profileApi from "@api/profile.api";

class ProfileService {
  async updateAvatar(body: any, id: string) {
    try {
      const { data } = await profileApi.updateAvatar(body, id);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }

  async updateCover(body: any, id: string) {
    try {
      const { data } = await profileApi.updateCover(body, id);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }
}

export const profileService = new ProfileService();
export default profileService;
