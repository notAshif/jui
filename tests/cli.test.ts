import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const CLI_PATH = path.resolve(__dirname, "..", "bin", "jui.mjs");
const TEMP_DIR = path.resolve(__dirname, "..", ".test-tmp");

describe("JUI CLI", () => {
  beforeEach(() => {
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(TEMP_DIR)) {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  });

  it("should show help when run with --help", () => {
    const output = execSync(`node "${CLI_PATH}" --help`, { encoding: "utf-8" });
    assert.ok(output.includes("JUI CLI"));
    assert.ok(output.includes("Usage:"));
    assert.ok(output.includes("add <component...>"));
  });

  it("should list all 28 available components with list command", () => {
    const output = execSync(`node "${CLI_PATH}" list`, { encoding: "utf-8" });
    assert.ok(output.includes("Available JUI Components (28 Total):"));
    assert.ok(output.includes("button"));
    assert.ok(output.includes("dialog"));
    assert.ok(output.includes("badge"));
    assert.ok(output.includes("tabs"));
  });

  it("should initialize utils.ts with init command and show framework availability", () => {
    const output = execSync(`node "${CLI_PATH}" init -y`, { cwd: TEMP_DIR, encoding: "utf-8" });
    assert.ok(output.includes("Initializing JUI in your project"));
    assert.ok(output.includes("Available for Next.js, Vite"));
    assert.ok(output.includes("Created lib\\utils.ts") || output.includes("Created lib/utils.ts"));

    const utilsPath = path.join(TEMP_DIR, "lib", "utils.ts");
    assert.strictEqual(fs.existsSync(utilsPath), true);
    const content = fs.readFileSync(utilsPath, "utf-8");
    assert.ok(content.includes("export function cn"));
  });

  it("should add both modern and pixel flavors by default", () => {
    const output = execSync(`node "${CLI_PATH}" add button`, { cwd: TEMP_DIR, encoding: "utf-8" });
    assert.ok(output.includes("Adding 1 component(s) [Flavor: both]"));
    assert.ok(output.includes("Created components/ui/button.tsx"));
    assert.ok(output.includes("Created components/pixel/button.tsx"));

    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "ui", "button.tsx")), true);
    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "pixel", "button.tsx")), true);
    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "lib", "utils.ts")), true);
  });

  it("should add only modern flavor when --flavor modern is passed", () => {
    execSync(`node "${CLI_PATH}" add badge --flavor modern`, { cwd: TEMP_DIR, encoding: "utf-8" });

    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "ui", "badge.tsx")), true);
    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "pixel", "badge.tsx")), false);
  });

  it("should add pixel flavor and include icons.tsx when needed", () => {
    execSync(`node "${CLI_PATH}" add dialog -f pixel`, { cwd: TEMP_DIR, encoding: "utf-8" });

    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "pixel", "dialog.tsx")), true);
    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "ui", "dialog.tsx")), false);
    assert.strictEqual(fs.existsSync(path.join(TEMP_DIR, "components", "pixel", "icons.tsx")), true);
  });

  it("should skip existing files unless -y/--overwrite is provided", () => {
    execSync(`node "${CLI_PATH}" add button`, { cwd: TEMP_DIR, encoding: "utf-8" });
    const buttonFile = path.join(TEMP_DIR, "components", "ui", "button.tsx");
    fs.writeFileSync(buttonFile, "// custom modified button", "utf-8");

    const secondRun = execSync(`node "${CLI_PATH}" add button`, { cwd: TEMP_DIR, encoding: "utf-8" });
    assert.ok(secondRun.includes("Skipped"));
    assert.strictEqual(fs.readFileSync(buttonFile, "utf-8"), "// custom modified button");

    const overwriteRun = execSync(`node "${CLI_PATH}" add button -y`, { cwd: TEMP_DIR, encoding: "utf-8" });
    assert.ok(overwriteRun.includes("Created components/ui/button.tsx"));
    assert.notStrictEqual(fs.readFileSync(buttonFile, "utf-8"), "// custom modified button");
  });
});
