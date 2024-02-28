import express from 'express';

import dotenv from 'dotenv';

import homeRoutes from './routes/homeRoutes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.midlleware();
    this.routes();
  }

  midlleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
