import fastify, { FastifyInstance, FastifyPluginAsync } from 'fastify';
import oauthPlugin from '@fastify/oauth2';
import fastifySwagger from '@fastify/swagger';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import authPlugin from '@/core/plugins/auth';
import { env } from '../config/env';

interface CustomRouteHandler {
  prefix_route: string;
  routes: FastifyPluginAsync;
}

class App {
  private app: FastifyInstance;
  private app_domain: string = '0.0.0.0';
  private app_port: number = env.API_PORT || 3333;

  constructor(appInit: { routes: (new () => CustomRouteHandler)[] }) {
    this.app = fastify({
      logger: true
    });

    this.app.register(authPlugin, {
      jwtSecret: env.JWT_SECRET,
      accessTokenName: 'access_token',
      refreshTokenName: 'refresh_token',
      cookiePath: '/api'
    });

    this.app.register(oauthPlugin, {
      name: 'googleOAuth2',
      credentials: {
        client: {
          id: env.GOOGLE_CLIENT_ID as string,
          secret: env.GOOGLE_CLIENT_SECRET as string
        },
        auth: oauthPlugin.GOOGLE_CONFIGURATION
      },
      startRedirectPath: '/api/auth/google',
      callbackUri: env.GOOGLE_CALLBACK_URL as string,
      scope: ['profile', 'email']
    });

    this.app.register(cors, {
      origin: env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400
    });

    this.app.register(helmet, {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: []
        }
      }
    });

    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Boilerplate Fastify API Documentation',
          description: 'API documentation for the Fastify boilerplate',
          version: '1.0.0'
        }
      },
      transform: jsonSchemaTransform
    });

    this.app.addHook('preHandler', (req, _reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed body');
      }
      done();
    });

    this.app.register(fastifySwaggerUi, {
      routePrefix: '/docs'
    });

    this.routes(appInit.routes);
  }

  private routes(routes: (new () => CustomRouteHandler)[]) {
    routes.forEach((Route) => {
      const router = new Route();
      this.app.register(router.routes, {
        prefix: `/api${router.prefix_route}`
      });
    });

    this.app.get('/healthcheck', async (request, reply) => {
      reply.send({ healthcheck: 'server is alive' });
    });
  }

  public getApp(): FastifyInstance {
    return this.app;
  }

  public getDomain(): string {
    return this.app_domain;
  }

  public getPort(): number {
    return this.app_port;
  }

  public listen() {
    this.app.listen({ host: this.app_domain, port: this.app_port }, (err) => {
      if (err) {
        this.app.log.fatal({ msg: `Application startup error`, err });
        process.exit(1);
      }

      if (env.NODE_ENV !== 'test') {
        // eslint-disable-next-line no-console
        console.log(
          `App listening on the http://${this.app_domain}:${this.app_port} 🚀`
        );
      }
    });
  }

  public async close() {
    if (this.app) {
      await this.app.close();
    }
  }
}

export default App;
