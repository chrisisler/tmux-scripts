import { getLatestEntry, createEntry } from "./database";

const getTimeDistancehhmmss = (createdAt: number) => {
  const now = +new Date();
  const diff = now - createdAt;
  return new Date(diff).toISOString().substr(11, 8);
};

// Invoking this script with NO arguments displays the active task name and timer or empty display.
// Invoking this script WITH arguments creates a time entry with the given name; this in
// combination with a line in .tmux/config displays the new/active time entry
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    const latest = await getLatestEntry();
    if (latest === undefined) console.log("No Task");
    else console.log(`X:${latest.name} (${getTimeDistancehhmmss(latest.createdAt)})`);
    return;
  }
  const name = args.join(" ");
  try {
    const created = await createEntry(name);
    console.log(`N:${name} (${getTimeDistancehhmmss(created.createdAt)})`);
  } catch (err) {
    console.error(err);
  }
}

main();
