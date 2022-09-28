import { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
  Box,
  Button,
  styled,
  InputBase,
  useTheme,
} from "@mui/material";
import { Discussion, Profile } from "types";
import { SERVER_URL } from "constants/endpoints";
import { format } from "date-fns";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(1)};
    width: 100%;
`
);

export interface ProblemDiscussionProps {
  discussions: Discussion[];
  profile: Profile;
  onAddDiscussion: (content: string) => Promise<any>;
}

export const ProblemDiscussion = ({
  discussions,
  profile,
  onAddDiscussion,
}: ProblemDiscussionProps) => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  const sortedDiscussions = _.cloneDeep(discussions).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const onSubmit = () => {
    if (value.length > 0) {
      const promise = onAddDiscussion(value);
      promise.then(() => {
        setValue("");
      });
    }
  };

  return (
    <>
      {profile && profile.id > 0 && profile.user && (
        <Box
          sx={{
            background: theme.colors.alpha.white[50],
            display: "flex",
            alignItems: "center",
            p: 1,
            mb: 2,
            width: "100%",
            bgcolor: "transparent",
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box flexGrow={1} display="flex" alignItems="center">
            <Avatar
              sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
              alt={profile.user.username}
              src={profile.avatar}
            />
            <MessageInputWrapper
              autoFocus
              placeholder="Write your message here..."
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              startIcon={<SendTwoToneIcon />}
              variant="contained"
              onClick={onSubmit}
              disabled={value.length === 0}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}

      <List
        sx={{
          width: "100%",
          height: "100%",
          // bgcolor: (theme) => `${theme.palette.background.paper}`,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {sortedDiscussions.map((discussion, idx) => (
          <Fragment key={`list-${discussion.id}`}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={discussion.username}
                  src={`${SERVER_URL}${discussion.avatar}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                    component={NavLink}
                    to={`/users/${discussion.username}`}
                  >
                    {discussion.username}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {discussion.content}
                    </Typography>
                    <br />
                    {format(
                      new Date(discussion.created_at),
                      "dd MMM yyyy hh:mm a"
                    )}
                  </>
                }
              />
            </ListItem>
            {idx < discussions.length - 1 && (
              <Divider
                key={`divider-${discussion.id}`}
                variant="inset"
                component="li"
              />
            )}
          </Fragment>
        ))}
      </List>
    </>
  );
};
