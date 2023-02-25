import fs from 'fs/promises';
const file = './data.json';

export class ThingsFileRepo {
  read() {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as { [key: string]: string | number }[]);
  }

  readOne(id: number) {
    return this.read().then((existingData) => {
      const item = existingData.find((existingItem) => existingItem.id === id);
      if (!item) {
        throw new Error(`Item with id ${id} not found`);
      }

      return item;
    });
  }

  write(data: { [key: string]: string | number }[]) {
    return this.read().then((existingData) => {
      if (!Array.isArray(data)) {
        data = Object.values(data);
        console.log(data);
      }

      // Generate new id
      const lastId =
        existingData.length > 0 ? existingData[existingData.length - 1].id : 0;
      const newData = data.map((item, index) => ({
        ...item,
        id: Number(lastId) + index + 1,
      }));

      newData.forEach((item) => existingData.push(item));

      return fs.writeFile(file, JSON.stringify(existingData, null, 2));
    });
  }

  update(id: number, dataToUpdate: { [key: string]: string | number }) {
    return this.read().then((existingData) => {
      const index = existingData.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new Error(`Item with id ${id} not found`);
      }

      const updateItem = { ...existingData[index], ...dataToUpdate };
      existingData[index] = updateItem;
      return fs.writeFile(file, JSON.stringify(existingData, null, 2));
    });
  }
}
