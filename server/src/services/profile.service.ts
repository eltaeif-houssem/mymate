import Profile from "@models/profile.model";

class ProfileService {
  async updateUserAvatar(filter: any, filename: string) {
    let profileExists = await Profile.findOne(filter);

    if (!profileExists) {
      await Profile.create(filter);
    }

    await Profile.findOneAndUpdate(filter, { profilePicture: filename });
  }

  async updateUserCover(filter: any, filename: string) {
    let profileExists = await Profile.findOne(filter);

    if (!profileExists) {
      await Profile.create(filter);
    }

    await Profile.findOneAndUpdate(filter, { backgroundPicture: filename });
  }
}

export const profileService = new ProfileService();
export default profileService;
