import Profile from "@models/profile.model";

class ProfileService {
  async updateUserAvatar(filter: any, filename: string) {
    await Profile.findOneAndUpdate(filter, { profilePicture: filename });
  }

  async updateUserCover(filter: any, filename: string) {
    await Profile.findOneAndUpdate(filter, { backgroundPicture: filename });
  }
}

export const profileService = new ProfileService();
export default profileService;
