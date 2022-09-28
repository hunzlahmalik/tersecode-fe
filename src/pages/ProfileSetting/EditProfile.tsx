import { useState } from "react";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  TextField,
  Avatar,
} from "@mui/material";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import Text from "components/Text";
import Label from "components/Label";

import { useAppSelector, useAppDispatch } from "state";
import { selectProfile } from "state/profile/selectors";
import { updateProfileWithToast } from "state/profile/actions";

const EditProfile = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    first_name: profile.user.first_name,
    last_name: profile.user.last_name,
    bio: profile.bio,
    github: profile.github,
    linkedin: profile.linkedin,
  });

  const handleChange = (key: keyof typeof data, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    updateProfileWithToast(dispatch, {
      payload: {
        ...data,
        user: { first_name: data.first_name, last_name: data.last_name },
      },
      username: profile.user.username,
    });
    setIsEditing(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
            {isEditing ? (
              <Button
                variant="text"
                startIcon={<DoneTwoToneIcon />}
                onClick={() => {
                  setIsEditing(!isEditing);
                  handleSubmit();
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="text"
                startIcon={<EditTwoToneIcon />}
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit
              </Button>
            )}
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    First Name:
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={data.first_name}
                      onChange={(e) =>
                        handleChange("first_name", e.target.value)
                      }
                    />
                  ) : (
                    <Text color="black">
                      <b>{data.first_name}</b>
                    </Text>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Last Name:
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={data.last_name}
                      onChange={(e) =>
                        handleChange("last_name", e.target.value)
                      }
                    />
                  ) : (
                    <Text color="black">
                      <b>{data.last_name}</b>
                    </Text>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Bio:
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={data.bio}
                      onChange={(e) => handleChange("bio", e.target.value)}
                    />
                  ) : (
                    <Box sx={{ maxWidth: { xs: "auto", sm: 300 } }}>
                      <Text color="black">{data.bio}</Text>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Github:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={data.github}
                      onChange={(e) => handleChange("github", e.target.value)}
                    />
                  ) : (
                    <Text color="black">
                      <b>{data.github}</b>
                    </Text>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    LinkedIn:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={data.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                    />
                  ) : (
                    <Text color="black">
                      <b>{data.linkedin}</b>
                    </Text>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Avatar:
                  </Box>
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                  {isEditing ? (
                    <Avatar
                      alt={profile.user.first_name}
                      src={profile.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  ) : (
                    <Avatar
                      alt={profile.user.first_name}
                      src={profile.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
            <Button variant="text" startIcon={<EditTwoToneIcon />} disabled>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{profile.user.email}</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Primary</Label>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Username:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{profile.user.username}</b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
