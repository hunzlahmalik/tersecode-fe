import { Box, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(["color", "fill"])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: '';
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

const HeaderMenu = () => {
  return (
    <ListWrapper
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <List disablePadding component={Box} display="flex">
        <ListItem
          button
          classes={{ root: "MuiListItem-indicators" }}
          component={NavLink}
          to="/problems"
        >
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary="Problems"
          />
        </ListItem>
        <ListItem
          button
          classes={{ root: "MuiListItem-indicators" }}
          component={NavLink}
          to="/submissions"
        >
          <ListItemText
            primaryTypographyProps={{ noWrap: true }}
            primary="Submissions"
          />
        </ListItem>
      </List>
    </ListWrapper>
  );
};

export default HeaderMenu;
