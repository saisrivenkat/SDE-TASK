
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()
require('dotenv').config();

export const resolvers = {
    Query: {
      hello: () => 'Hello World!',
    },
    Mutation: {
      login: async (_, { email, password }) => {
        const user = await prisma.user.findUnique({ where: { email } });
  
        if (!user) {
          throw new Error('Invalid email or password');
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordMatch) {
          throw new Error('Invalid email or password');
        }
  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
        return { user,token };
      },
    },
    updateUser: async (_, { id, data }, { prisma, userId }) => {
      if (userId !== id) {
        throw new Error('You are not authorized to perform this action');
      }
  
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
  
      await prisma.log.create({
        data: {
          type: 'USER_UPDATE',
          message: `User with ID ${id} updated`,
          userId: id,
        },
      });
  
      return user;
    },
  };
