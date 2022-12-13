import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button} from "@mui/material";
import { AuthContext } from "../context/auth";

function MenuBar() {
  let navigate = useNavigate();
  const { user, logout, createpost} = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  }

  const createPost = () => {
    createpost();
    navigate('/post');
  }

  console.log(user);

  return(
    <Box sx={{flexGrow:1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography varient="h5" component="div">
            <Link to="/" style={{textDecoration:"none", color:"white"}}>ReactLogin</Link>
          </Typography>
          <Box alignItems="right" sx={{flexGrow:1, textAlign:"right"}}>
            {user?
            <>
             <Button style={{textDecoration:"none", color:"white", marginRight:"10px"}} onClick={onLogout}>Logout </Button>
             <Button style={{textDecoration:"none", color:"white"}} onClick={createPost}>Post </Button>
            </>
            :
            <>
            <Link to="/login" style={{textDecoration:"none", color:"white", marginRight:"10px"}}>Login</Link>
          <Link to="/register" style={{textDecoration:"none", color:"white"}}>Register</Link>
            </>
  
          }
        
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;