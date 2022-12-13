import React, { useState, useContext } from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hook";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";


function Post(){
    return(
      <Container spacing={2} maxWidth="sm">
       <h3>Post</h3>
       <p>U can post here!</p>
    <Stack spacing={2} paddingBottom={2}>
      <TextField label="Body" name="body" />
      <TextField label="Iamge" name="password" />
      <Button variant="contained">Upload</Button>
    </Stack>
    <Button variant="contained">Post</Button>
  </Container>
    )

}

export default Post;