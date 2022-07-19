import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [user] = useAuthState(auth);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='static' style={{ backgroundColor: "#7cfed3" }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Lato",
              color: "black",
              fontWeight: 700,
              textDecoration: "none",
            }}>
            Taskify
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='' />
              </IconButton>
            </Tooltip>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElUser}
              open={ Boolean(anchorElUser) }
              
              onClose={handleCloseUserMenu}>
              <MenuItem>
                {user ? (
                  <Typography textAlign='center' onClick={() => signOut(auth)}>
                    Logout
                  </Typography>
                ) : (
                  <Typography textAlign='center'>No user</Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
