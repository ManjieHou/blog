import React, { useState, useContext } from "react";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hook";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";


const LOGIN_USER = gql`
  mutation login($loginInput:LoginInput ) {
    loginUser(loginInput:$loginInput){
      email
      username
      token
    }
     
    }
`
function Login(props){
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [ errors, setErrors] = useState([]);

  function loginUserCallback(){
    loginUser();
  }

  const {onChange, onSubmit, values } = useForm(loginUserCallback,{
    email:'',
    password:''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER,{
    update(proxy, { data: { loginUser:userData}}){
      context.login(userData);
      navigate('/');
    },
    onError({graphQLErrors}){
          setErrors(graphQLErrors);
    },
    variables:{ loginInput: values}
});

    return(
      <Container spacing={2} maxWidth="sm">
       <h3>Login</h3>
       <p>This is login page</p>
    <Stack spacing={2} paddingBottom={2}>
      <TextField label="Email" name="email" onChange={onChange} />
      <TextField label="Password" name="password" onChange={onChange} />
    </Stack>
    {errors.map(function(erorr){
      return(
        <Alert severity="error">{erorr.message}</Alert>);

    })}
    <Button variant="contained" onClick={onSubmit}>Login</Button>
  </Container>
    )

}

// const Login = props => {
//   const context = useContext(AuthContext);
//   const [errors, setErrors] = useState({});

//   const { onChange, onSubmit, values } = useForm(loginUser, {
//     username: "",
//     password: ""
//   });

//   const [addUser, { loading }] = useMutation(LOGIN_USER, {
//     update(
//       _,
//       {
//         data: { login: userData }
//       }
//     ) {
//       context.login(userData);
//       this.props.history.push("/");
//     },
//     onError(err) {
//       setErrors(err.graphQLErrors[0].extensions.exception.errors);
//     },
//     variables: values
//   });

//   function loginUser() {
//     addUser();
//   }

//   return (
//     <div className="form-container">
//       <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
//         <h1>Login</h1>
//         <Form.Input
//           label="Username"
//           placeholder="Username..."
//           name="username"
//           type="text"
//           error={errors.username ? true : false}
//           value={values.username}
//           onChange={onChange}
//         ></Form.Input>

//         <Form.Input
//           label="Password"
//           placeholder="Password..."
//           name="password"
//           type="password"
//           error={errors.password ? true : false}
//           value={values.password}
//           onChange={onChange}
//         ></Form.Input>

//         <Button type="submit" primary>
//           Login
//         </Button>
//       </Form>

//       {Object.keys(errors).length > 0 && (
//         <div className="ui error message">
//           <ul className="list">
//             {Object.values(errors).map(value => (
//               <li key={value}>{value} </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };



export default Login;