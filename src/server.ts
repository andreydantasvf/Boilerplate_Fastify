import { errorHandler } from '@/core/webserver/error-handler';
import App from '@/core/webserver/app';
import { UserRoutes } from './modules/users/user.routes';
import { AuthRoutes } from './modules/auth/auth.routes';
import { env } from 'process';

export const app = new App({
  routes: [UserRoutes, AuthRoutes]
});

errorHandler(app.getApp());

if (env.NODE_ENV !== 'test') {
  app.listen();
}
