import { errorHandler } from '@/core/webserver/error-handler';
import App from '@/core/webserver/app';
import { UserRoutes } from './modules/users/user.routes';

export const app = new App({
  plugins: [],
  routes: [UserRoutes]
});

errorHandler(app.getApp());

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
