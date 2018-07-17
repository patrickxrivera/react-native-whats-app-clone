const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req) => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/patrick-431cc6/chatty-graphql-api/dev',
      secret: 'mysecret123'
    })
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
