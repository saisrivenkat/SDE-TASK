const { gql } = require('apollo-server');

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    updateUser(id: Int!, data: UpdateUserInput!): User
  }

  type AuthPayload {
    token: String!
  }

  type UpdatedUser {
    id: Int
    firstName: String
    email: String
    gender: String
    city: String
    updatedAt: String
  }
`;
