const { ApolloServer, gql } = require('apollo-server');
const {typeDefs}  = require('./types');
const jwt = require('jsonwebtoken');
const {resolvers} = require('./resolvers')
require('dotenv').config();

const prisma = new PrismaClient();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    let userId = null;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      userId = decodedToken.userId;
    } catch (err) {}

    return { prisma, userId };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
