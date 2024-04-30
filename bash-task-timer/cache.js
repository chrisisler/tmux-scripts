let { writeFileSync, readFileSync } = require("fs");

let cachePath = `${__dirname}/time-cache-2023.json`;
let cache;
try {
  cache = JSON.parse(readFileSync(cachePath));
} catch (error) {
  console.log("JSON Parse:", error.name);
}

export const cacheWrite = (key, value) => {
  cache[key] = value;
  writeFileSync(cachePath, JSON.stringify(cache, null, 2));
};

if (Object.keys(cache).length === 0) {
  cacheWrite(new Date(), "genesis property");
}

module.exports = function timeRestricted({ minutes = 30 }, fn) {
  return async function timeRestrictedAsyncFn() {
    let times = Object.keys(cache);
    // Relies on Node V8 engine keeping JSON keys ordered.
    let latest = times[times.length - 1];

    let restriction = new Date(latest);
    restriction.setMinutes(restriction.getMinutes() + minutes);

    let now = new Date();

    let isPastRestriction = restriction < now;
    if (isPastRestriction || cache[latest] === "genesis property") {
      let computed = await fn();
      cacheWrite(now, computed);
      return computed;
    }

    return cache[latest];
  };
};
