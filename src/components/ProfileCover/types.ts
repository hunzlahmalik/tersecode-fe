import { Profile } from "types";

export type ProfileCoverProps = Profile & {
  handleAvatarUpload: (file: File) => void;
};
