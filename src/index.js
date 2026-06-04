export class ChaosSimulator {
  constructor(services) { this.services = new Map(services.map((s) => [s.name, { status: "up", deps: [], ...s }])); }
  fail(name) { this.services.get(name).status = "down"; return this.impact(); }
  recover(name) { this.services.get(name).status = "up"; return this.impact(); }
  impact() {
    const impacted = new Set([...this.services.values()].filter((s) => s.status === "down").map((s) => s.name));
    let changed = true;
    while (changed) {
      changed = false;
      for (const svc of this.services.values()) if (!impacted.has(svc.name) && svc.deps.some((d) => impacted.has(d))) { impacted.add(svc.name); changed = true; }
    }
    return { impacted: [...impacted], blastRadius: impacted.size / this.services.size };
  }
}
