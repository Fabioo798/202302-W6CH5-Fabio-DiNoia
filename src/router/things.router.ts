import { Router } from 'express'


export const thingsRouter = Router();
const repo = new ThingsFileRepo()
const controller = new ThingsController(repo)
