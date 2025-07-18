import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import authModule from './features/auth';
import vendorModule from './features/vendors';
import orderModule from './features/orders';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

async function createServer() {
  const typeDefs = mergeTypeDefs([
    authModule.schema,
    vendorModule.schema,
    orderModule.schema,
    // ... other modules
  ]);

  const resolvers = mergeResolvers([
    authModule.resolvers,
    vendorModule.resolvers,
    orderModule.resolvers,
    // ... other modules
  ]);

  const schema = authDirective(makeExecutableSchema({ typeDefs, resolvers }));


  // Initialize services
  const services = {
    ...authModule.services,
    ...vendorModule.services,
    ...orderModule.services,
    // ... other services
  };



// Load environment variables
require('dotenv').config();

async function startServer() {
  // Connect to database
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);

  // Create WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  // Create Apollo Server
  const server = new ApolloServer<Context>({
    schema,
    context: ({ req }) => ({
      services, // Inject services into context
      user: req.user, // From auth middleware
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }: { req: express.Request }) => {
        // Get user from token
        const token = req.headers.authorization || '';
        const user = await getUserFromToken(token);
        return { user };
      },
    })
  );

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

async function getUserFromToken(token: string) {
  if (!token) return null;
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret) as { userId: string };
    // Fetch user from DB (assuming User is a Mongoose model or similar)
    const user = await User.findById(decoded.userId);
    return user;
  } catch (err) {
    return null;
  }
}

