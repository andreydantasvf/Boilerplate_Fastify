import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { env } from './config';
import { userRoutes } from './routes/user.routes';
import { errorHandler } from './errors/errorHandler';
import { authRoutes } from './routes/auth.routes';
import auth from './plugins/auth';

export const startApp = async () => {
  const app = fastify({ logger: true });

  // Plugins
  app.register(cors);
  app.register(helmet);
  app.register(auth);

  // Routes
  app.register(userRoutes, { prefix: '/api/users' });
  app.register(authRoutes, { prefix: '/api/auth' });

  // Middleware global de erros
  errorHandler(app);

  // Start Server
  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    console.log(
      `🚀 Server running at http://localhost:${env.PORT} in ${env.NODE_ENV} mode`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
