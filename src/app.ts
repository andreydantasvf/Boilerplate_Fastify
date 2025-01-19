import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { env } from './utils/env';

export const startApp = async () => {
  const app = fastify({ logger: true });

  // Plugins
  app.register(cors);
  app.register(helmet);

  // Routes

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
