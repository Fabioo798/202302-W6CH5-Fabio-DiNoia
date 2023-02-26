import { Response, Request } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsController {
  constructor(public repo: ThingsFileRepo) {
    this.repo = repo;
  }

  get(req: Request, resp: Response) {
    this.repo.read().then((data) => {
      resp.json(data);
    });
  }

  getOne(req: Request, resp: Response) {
    const id = Number(req.params.id);
    this.repo
      .readOne(id)
      .then((data) => {
        if (!data) {
          resp.status(404).send(`item with id ${id} not found`);
        }

        resp.status(200).send(data);
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }

  updateOne(req: Request, resp: Response) {
    const id = Number(req.params.id);
    const newData = req.body;

    this.repo
      .updateOne(id, newData)
      .then((updatedItem) => {
        if (updatedItem === null) {
          resp.status(404).send(`Item with ID ${id} not found`);
        } else {
          resp.json(updatedItem);
        }
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }

  create(req: Request, resp: Response) {
    const newItem = req.body;

    this.repo
      .write(newItem)
      .then(() => {
        resp.sendStatus(201);
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }

  delete(req: Request, resp: Response) {
    const id = Number(req.params.id);
    this.repo
      .delete(id)
      .then(() => {
        resp.sendStatus(204);
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }
}
