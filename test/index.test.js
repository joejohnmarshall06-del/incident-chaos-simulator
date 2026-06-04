import test from "node:test";
import assert from "node:assert/strict";
import { ChaosSimulator } from "../src/index.js";
test("propagates dependency impact", () => {
  const sim = new ChaosSimulator([{ name: "db" }, { name: "api", deps: ["db"] }]);
  assert.deepEqual(sim.fail("db").impacted.sort(), ["api", "db"]);
});
