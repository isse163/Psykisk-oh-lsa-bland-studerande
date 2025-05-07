import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { getSleepVsDepression } from './sstatparts.js';

export default async function dbRouter(app, databasesFolder, sqliteFolder) {
  const dbInfoFile = path.join(databasesFolder, 'databases-in-use.json');
  let dbInfos = [];

  if (fs.existsSync(dbInfoFile)) {
    dbInfos = JSON.parse(fs.readFileSync(dbInfoFile, 'utf-8'));
  }

  let connections = {};
  for (let { name, type, path: filePath } of dbInfos) {
    if (type.toLowerCase() === 'sqlite') {
      const dbFile = path.join(sqliteFolder, filePath);
      if (fs.existsSync(dbFile)) {
        connections[name] = { type: 'sqlite', con: new Database(dbFile) };
      }
    }
  }

  const defaultDb = connections[Object.keys(connections)[0]]?.con;

  app.get('/api/data/sleep-vs-depression', async (req, res) => {
    try {
      const result = await getSleepVsDepression(defaultDb);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
