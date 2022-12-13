const { gql } = require("apollo-server");
module.exports = gql`
  type User {
    email: String,
    username: String,
    password: String,
    token: String
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!

  }
  
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    getPosts: [Post]
  }

  input LoginInput{
    email:String,
    password: String
  }

  input RegisterInput {
    username: String,
    email: String,
    password: String,
    confirmPassword: String
  }
  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;