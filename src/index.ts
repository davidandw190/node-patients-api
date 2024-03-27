import { App } from './app';

const startServer = (): void => {
  const app = new App()
  app.listen();
}

startServer();
