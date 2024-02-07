import { AppBar, Box, IconButton, InputBase, Toolbar } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
export const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              marginLeft: 0,
              marginRight: "2rem",
              flexDirection: "row",
            }}
          >
            <Box>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Buscar"
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
