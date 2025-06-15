import { errorHandler } from '@/core/webserver/error-handler';
import App from '@/core/webserver/app';
import { UserRoutes } from './modules/users/user.routes';
import { AuthRoutes } from './modules/auth/auth.routes';

export const app = new App({
  routes: [UserRoutes, AuthRoutes]
});

errorHandler(app.getApp());

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
