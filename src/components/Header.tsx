import { Home } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../index.css";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={(e) => navigate("/")}
        >
          <Home />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Payment Investigation
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
