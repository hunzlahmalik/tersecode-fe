import {
  Box,
  Typography,
  Tooltip,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";

import {
  ArrowBackTwoTone,
  ArrowForwardTwoTone,
  UploadTwoTone,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";

import { Input, AvatarWrapper, ButtonUploadWrapper } from "./styled";
import { ProfileCoverProps } from "./types";

export const ProfileCover = ({
  user,
  handleAvatarUpload,
  ...profile
}: ProfileCoverProps) => {
  const fullName = `${user.first_name} ${user.last_name}`;

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleAvatarUpload(file);
    }
  };

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }}>
            <ArrowBackTwoTone />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile for {fullName}
          </Typography>
        </Box>
      </Box>

      <AvatarWrapper>
        <Avatar variant="rounded" alt={fullName} src={profile.avatar} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={onImageUpload}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoTone />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {fullName}
        </Typography>
        <Typography variant="subtitle2">{profile.bio}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {profile.country}
        </Typography>
        <Box
          display={{ xs: "block", md: "flex" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {profile.github && profile.github.length > 0 && (
              <Button size="small" variant="contained" startIcon={<GitHub />}>
                Github
              </Button>
            )}
            {profile.linkedin && profile.linkedin.length > 0 && (
              <Button size="small" variant="contained" startIcon={<LinkedIn />}>
                LinkedIn
              </Button>
            )}
          </Box>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            size="small"
            variant="text"
            endIcon={<ArrowForwardTwoTone />}
          >
            Settings
          </Button>
        </Box>
      </Box>
    </>
  );
};
