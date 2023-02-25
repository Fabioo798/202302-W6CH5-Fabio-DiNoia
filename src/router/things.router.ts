import { Router } from 'express';
import { ThingsController } from '../controller/things.controller.js';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

// eslint-disable-next-line new-cap
export const thingsRouter = Router();
const repo = new ThingsFileRepo();
const controller = new ThingsController(repo);

thingsRouter.get('/', controller.getAll.bind(controller));
thingsRouter.get('/:id', controller.getOne.bind(controller));
thingsRouter.post('/', controller.updateAll.bind(controller));
thingsRouter.patch('/:id', controller.updateAll.bind(controller));
