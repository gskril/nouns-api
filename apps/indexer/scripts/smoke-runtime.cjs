const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { createRequire } = require("node:module");
const root = path.resolve(__dirname, "..");
const requireApp = createRequire(path.join(root, "package.json"));
const requirePonder = createRequire(requireApp.resolve("@ponder/core"));
const { Ponder } = requireApp("@ponder/core");
const esbuild = requirePonder("esbuild");
fs.mkdirSync(path.join(root, ".ponder"), { recursive: true });
const temp = fs.mkdtempSync(path.join(root, ".ponder/smoke-"));
const configOutput = esbuild.transformSync(
  fs.readFileSync(path.join(root, "ponder.config.ts"), "utf8"),
  { loader: "ts", format: "cjs" }
);
const mod = { exports: {} };
// setup() compiles handlers and initializes the local store without starting RPC sync.
process.env.PONDER_RPC_URL_1 = "http://127.0.0.1:1";
new Function("module", "exports", "require", configOutput.code)(
  mod,
  mod.exports,
  requireApp
);
const { config } = mod.exports;
config.database = { kind: "sqlite", filename: path.join(temp, "cache.db") };
let ponder;
(async () => {
  const reservation = http.createServer();
  await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const options = {
    rootDir: root,
    configFile: path.join(root, "ponder.config.ts"),
    schemaFile: path.join(root, "schema.graphql"),
    srcDir: path.join(root, "src"),
    generatedDir: path.join(root, "generated"),
    ponderDir: temp,
    logDir: path.join(temp, "logs"),
    port,
    maxHealthcheckDuration: 240,
    logLevel: "debug",
    uiEnabled: false,
  };
  ponder = new Ponder({ config, options });
  const error = await ponder.setup();
  assert.equal(error, undefined);
  await new Promise((resolve) => setTimeout(resolve, 500));
  assert.ok(ponder.userStore.schema, "Application schema loaded");
  const created = await ponder.userStore.create({
    modelName: "Dao",
    timestamp: 1,
    id: "runtime-smoke",
    data: { name: "Runtime smoke", symbol: "TEST" },
  });
  assert.equal(created.id, "runtime-smoke");
  const found = await ponder.userStore.findUnique({
    modelName: "Dao",
    id: "runtime-smoke",
  });
  assert.equal(found.name, "Runtime smoke");
  await ponder.userStore.update({
    modelName: "Dao",
    timestamp: 2,
    id: "runtime-smoke",
    data: { name: "Updated smoke" },
  });
  const response = await fetch(
    `http://127.0.0.1:${port}/?query=${encodeURIComponent(
      '{ dao(id:"runtime-smoke") { id name symbol } }'
    )}`
  );
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.errors, undefined);
  assert.deepEqual(json.data.dao, {
    id: "runtime-smoke",
    name: "Updated smoke",
    symbol: "TEST",
  });
  assert.equal(
    await ponder.userStore.delete({
      modelName: "Dao",
      timestamp: 3,
      id: "runtime-smoke",
    }),
    true
  );
  assert.equal(
    await ponder.userStore.findUnique({
      modelName: "Dao",
      id: "runtime-smoke",
    }),
    null
  );
  const health = await fetch(`http://127.0.0.1:${port}/health`);
  assert.equal(
    health.status,
    503,
    "Not yet synchronized, so health must not claim ready"
  );
  console.log(
    "PASS: Node",
    process.version,
    "Ponder SQLite migrations, application handlers/schema, create/read/update/delete, GraphQL HTTP query, and pre-sync health check. No external RPC/database used."
  );
})()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (ponder) await ponder.kill();
    fs.rmSync(temp, { recursive: true, force: true });
  });
