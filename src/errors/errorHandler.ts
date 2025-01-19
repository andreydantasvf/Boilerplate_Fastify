import {
  FastifyInstance,
  FastifyError,
  FastifyReply,
  FastifyRequest
} from 'fastify';
import { AppError } from './AppError';
import { ZodError } from 'zod';

export const errorHandler = (app: FastifyInstance) => {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof AppError) {
        // Erros operacionais personalizados
        return reply.status(error.statusCode).send({
          status: 'error',
          message: error.message
        });
      }

      if (error instanceof ZodError) {
        // Erros de validação
        return reply.status(400).send({
          status: 'error',
          message: error.flatten().fieldErrors
        });
      }

      // Erros desconhecidos
      console.error('Unexpected error:', error);
      return reply.status(500).send({
        status: 'error',
        message: 'Internal Server Error',
        error
      });
    }
  );
};
