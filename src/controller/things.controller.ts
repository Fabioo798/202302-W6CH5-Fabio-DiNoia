import { Response, Request } from 'express';
import { ThingsFileRepo } from '../repository/things.file.repo.js';

export class ThingsController {
  constructor(public repo: ThingsFileRepo) {
    this.repo = repo;
  }

  getAll(req: Request, resp: Response) {
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

  updateAll(req: Request, resp: Response) {
    const newData = req.body;
    this.repo.write(newData).then(() => {
      resp.sendStatus(200);
    });
  }

  updateOne(req: Request, resp: Response) {
    const id = Number(req.params.id);
    const updateData = req.body;
    this.repo
      .update(id, updateData)
      .then(() => {
        resp.sendStatus(200).send(updateData);
      })
      .catch((error) => {
        resp.status(500).send(error.message);
      });
  }
}
