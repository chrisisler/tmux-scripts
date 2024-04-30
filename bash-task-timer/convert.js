#!/usr/bin/env node
const util = require("util");
const exec = util.promisify(require("child_process").exec);

process.stdin.on("data", (data) => {
  let [timestamp, ...rest] = data.toString().split(" ");

  if (!timestamp) {
    console.log("Usage: node convert.js <timestamp>");
    process.exit(1);
  }

  const taskName = rest.join(" ").trim();

  if (!taskName) {
    return;
  }

  timestamp *= 1000;

  const now = +new Date();
  const diff = now - timestamp;
  let [hh, mm, ss] = new Date(diff).toISOString().substr(11, 8).split(":");

  const hours = parseInt(hh, 10);
  if (hours > 0 && hours % 3 === 0) {
    //   warned[hours] = true;
    //   runCommand(
    //     `terminal-notifier -title "You have been at this for 2 hours" -message "Go for a walk, take a break from: ${taskName}"`
    //   );
    // }
  }

  hh = hh === "00" ? "" : hh + "h ";
  mm = mm === "00" && !hh ? "" : mm + "m ";
  ss = ss + "s";

  const result = hh + mm + ss;

  console.log(`(${result}) ${taskName}`);
});

// function runCommand(cmd) {
//   const { stdout, stderr, error } = exec(cmd);
//   if (error) {
//     console.error(error);
//     process.exit(1);
//   }
//   if (stderr) {
//     console.error(stderr);
//     process.exit(1);
//   }
//   return stdout;
// }
