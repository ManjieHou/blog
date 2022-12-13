import React, { useState, useContext } from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hook";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

const REGISTER_USER = gql`
  mutation Mutation(
    $registerInput: RegisterInput)
    {
      registerUser(
        registerInput: $registerInput
      ){
        email
        username
        password
        token
      }
    }
  `
 
function Register(props){
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [ errors, setErrors] = useState([]);

  function registerUserCallback(){
    console.log("Callback hit");
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });


  const [ registerUser,{ loading }] = useMutation(REGISTER_USER, {
    update(proxy, {data:{ registerUser:userData}}){
      context.login(userData);
      navigate('/');
    },
    onError({graphQLErrors}) {
      setErrors(graphQLErrors);
  },
  variables: { registerInput: values}
 });

 return(
  <Container spacing={2} maxWidth="sm">
    <h3>Register</h3>
    <p>This is register page</p>
    <Stack spacing={2} paddingBottom={2}>
      <TextField label="Username" name="username" onChange={onChange} />
      <TextField label="Email" name="email" onChange={onChange} />
      <TextField label="Password" name="password" onChange={onChange} />
      <TextField label="Confirm Password" name="confirmPassword" onChange={onChange} />
    </Stack>
    {errors.map(function(erorr){
      return(
        <Alert severity="error">{erorr.message}</Alert>);

    })}
    <Button variant="contained" onClick={onSubmit}>Register</Button>
  </Container>

 )
}

export default Register;
