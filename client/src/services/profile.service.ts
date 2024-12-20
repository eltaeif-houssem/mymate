import * as profileApi from "@api/profile.api";

class ProfileService {
  async fetchProfile(id: string, access_token: string) {
    try {
      const { data } = await profileApi.getProfile(id, access_token);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }

  async updateAvatar(body: any, access_token: string) {
    try {
      const { data } = await profileApi.updateAvatar(body, access_token);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }

  async updateCover(body: any, access_token: string) {
    try {
      const { data } = await profileApi.updateCover(body, access_token);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }

  async updateProfile(id: string, body: any, access_token: string) {
    try {
      const { data } = await profileApi.updateProfile(id, body, access_token);
      return data;
    } catch (error: any) {
      return { error: error.response.data.message };
    }
  }
}

export const profileService = new ProfileService();
export default profileService;
