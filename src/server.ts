import { errorHandler } from '@/infrastructure/webserver/error-handler';
import App from '@/infrastructure/webserver/app';

export const app = new App({
  plugins: [],
  routes: []
});

errorHandler(app.getApp());

if (process.env.NODE_ENV !== 'test') {
  app.listen();
}
