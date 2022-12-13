const User = require('../../models/User');
const { ApolloError} = require('apollo-server-errors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

module.exports = {
    Mutation: {
        async registerUser(_, {registerInput: {username, email, password} }) {
            // See if an old user exists
            const oldUser = await User.findOne({email});

            // Throw error 
            if(oldUser){
                throw new ApolloError('A user is already registered' + email, 'USER_ALREADY_EXISTS');
            }

            // Encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            // Build out mongoose model
            const newUser = new User({
                username: username,
                email:email.toLowerCase(),
                password: encryptedPassword
            })

            // Create our JWT
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn:"2h"
                }
            );

            newUser.token = token

            // Save our user in MONGODB

            const res = await newUser.save();

            return{
                id:res.id,
                ...res._doc
            };
        },

        async loginUser(_, {loginInput: {email, password} }){
            // See if a user exists
            const user = await User.findOne({email});

            // Check if the entered password equals
            if(user&&(await bcrypt.compare(password, user.password))){
                // Create a NEW token
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn:"2h"
                    }
                );
                // Attach token to user model
                user.token = token;

                return{
                    id:user.id,
                    ...user._doc
                }

            }else{
                // If user not exist,return error
                throw new ApolloError('Incorrect password','INCORRECT_PASSWORD');
            }

        }
    },
    Query: {
       user: (_, {ID}) => User.findById(ID)
    }
}
