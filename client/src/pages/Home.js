import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button} from "@mui/material";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";



function Home() {
     const { user, logout} = useContext(AuthContext);
     

     return(
     <>
      <h1></h1>
      {user?
     <>
     <PostCard></PostCard>

     </>
     :
     <>
     <p>This is no user data</p>
     </>
      }
      </>
     
     )
}

export default Home;