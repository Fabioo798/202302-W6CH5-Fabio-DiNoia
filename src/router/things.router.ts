import { Router } from 'express';
import { ThingsController } from '../controller/things.controller.js';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

// eslint-disable-next-line new-cap
export const thingsRouter = Router();
const repo = new ThingsFileRepo();
const controller = new ThingsController(repo);

thingsRouter.get('/', controller.get.bind(controller));
thingsRouter.get('/:id', controller.getOne.bind(controller));
thingsRouter.put('/:id', controller.updateOne.bind(controller));
thingsRouter.patch('/', controller.create.bind(controller));
thingsRouter.delete('/:id', controller.delete.bind(controller));
