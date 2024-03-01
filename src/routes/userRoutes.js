import { Router } from "express";
import UserController from "../controllers/UserController";

const routes = new Router();

routes.post('/', UserController.store);
routes.get('/', UserController.index);
routes.put('/', UserController.update);
routes.delete('/', UserController.delete);

export default routes;
