import Profile from "@models/profile.model";
import * as fileUtil from "@utils/file.util";

class ProfileService {
  async findProfile(filter: any) {
    let profileExists = await Profile.findOne(filter);

    if (!profileExists) {
      profileExists = await Profile.create(filter);
    }

    return profileExists;
  }

  async updateUserAvatar(filter: any, filename: string) {
    let profileExists = await Profile.findOne(filter);

    if (!profileExists) {
      await Profile.create(filter);
    } else {
      fileUtil.deleteUploadFile(`${profileExists.profilePicture}`, "avatar");
    }

    await Profile.findOneAndUpdate(filter, { profilePicture: filename });
  }

  async updateUserCover(filter: any, filename: string) {
    let profileExists = await Profile.findOne(filter);

    if (!profileExists) {
      await Profile.create(filter);
    } else {
      fileUtil.deleteUploadFile(`${profileExists.backgroundPicture}`, "cover");
    }

    await Profile.findOneAndUpdate(filter, { backgroundPicture: filename });
  }

  async updateBio(filter: any, bio: string) {
    let profileExists = await Profile.findOne(filter);

    if (!profileExists) {
      await Profile.create(filter);
    }

    await Profile.findByIdAndUpdate(filter, { bio });
  }
}

export const profileService = new ProfileService();
export default profileService;
