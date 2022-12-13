import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from "moment";
import { gql } from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      }
    }
`;



function PostCard() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(data);

  return (
    
    //     <Container spacing={2} maxWidth="sm">
    //      <h3>Post</h3>
    //      <p>U can post here!</p>
    //   <Stack spacing={2} paddingBottom={2}>
    //     <TextField label="Body" name="body" />
    //     <TextField label="Iamge" name="password" />
    //     <Button variant="contained">Upload</Button>
    //   </Stack>
    //   <Button variant="contained">Post</Button>
    // </Container>
      
    <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid>
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="alex"
        subheader="21:14"
      />
       <CardMedia
        component="img"
        image={require('../static/1.jpg')}
        height="194"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        123123123123123
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
       <p>like</p>
        </IconButton>
      </CardActions>
    </Card>
    </Grid>
    <Grid>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="k"
        subheader="21:22"
      />
       <CardMedia
        component="img"
        image={require('../static/2.jpg')}
        height="194"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        453454353
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
       <p>like</p>
        </IconButton>
      </CardActions>
    </Card>

    </Grid>
    </Grid>
    </Box>
    
    
  );
}

export default PostCard;