import * as _sqlite3 from "sqlite3";

import { TimeEntry } from "./interfaces";

const sqlite3 = _sqlite3.verbose();
const db = new sqlite3.Database("./entries.db", err => {
  if (err) {
    console.error(`Failed to open database: ${err.message}`);
  }
});

// ensure db is created
db.run(
  `CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    startedAt INTEGER NOT NULL,
    endedAt INTEGER,
    name TEXT
  )`,
  err => {
    if (err) {
      console.error(`Failed to create table: ${err.message}`);
    }
  }
);

// this runs when creating a new task... don't want that.
if (process.argv.slice(2).length > 1) {
  process.on("beforeExit", () => {
    db.serialize(async () => {
      try {
        const latest = await getLatestEntry();
        console.log("Closing: latest is", latest);
        // if (latest === null) return;
        // console.log("\nEnding time entry...\n");
        // await endEntry();
        // console.log(`Task "${latest.name}" completed at ${latest.createdAt}.`);
      } catch (error) {
        console.error(
          `Failed to write before closing db: ${error instanceof Error ? error.message : error}`
        );
      }
    });

    db.close(err => {
      if (err) {
        console.error(`Failed to close database: ${err.message}`);
      }
    });
  });
}

// run a query as Promise
const _run = async (
  query: string,
  params: unknown[] = []
): Promise<{ id: number; changes: number }> =>
  new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        console.error("Failed to run query: " + query);
        console.log(err);
        reject(err);
      } else {
        // If execution was successful, the this object will contain lastID
        // the value of the last inserted row ID
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });

// get entry as Promise
const _get = async (query: string, params: unknown[] = []): Promise<TimeEntry> =>
  new Promise((resolve, reject) => {
    db.serialize(() => {
      db.get(query, params, function (err, row) {
        if (err) {
          console.error("Failed to run GET query: " + query);
          console.log(err);
          reject(err);
        } else {
          // Runtime type validation would go here
          // @ts-ignore
          resolve(row);
        }
      });
    });
  });

// get last entry
export const getLatestEntry = async (): Promise<TimeEntry> => {
  const row = await _get("SELECT * FROM entries ORDER BY id DESC LIMIT 1");
  // @ts-ignore
  return row;
};

// create entry
export const createEntry = async (name: string): Promise<TimeEntry> => {
  const createdAt: number = +new Date();
  const result = await _run("INSERT INTO entries VALUES (null, ?, ?, ?)", [createdAt, null, name]);
  return {
    id: result.id,
    name,
    createdAt,
    endedAt: null,
  };
};

// write the `endedAt` field
export const endEntry = async () => {
  const endedAt = +new Date();
  const latest = await getLatestEntry();
  const updated = await _run("UPDATE entries SET endedAt = ? WHERE id = ?", [endedAt, latest.id]);
  return updated;
};
