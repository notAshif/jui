#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, "..");

// Load registry (fallback to reading from lib/registry.json)
let registry;
try {
  const registryPath = path.join(pkgRoot, "lib", "registry.json");
  if (fs.existsSync(registryPath)) {
    registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
  } else {
    console.error("[!!] Registry not found. Please run 'npm run build:registry' first.");
    process.exit(1);
  }
} catch (err) {
  console.error("[!!] Failed to load registry:", err.message);
  process.exit(1);
}

const VERSION = registry.version || "0.1.0";

const HELP_TEXT = `
+------------------------------------------------------------------------+
|        _ _   _ ___                                                     |
|       | | | | |_ _|                                                    |
|    _  | | | | || |                                                     |
|   | |_| | |_| || |                                                     |
|    \\___/ \\___/|___|   JUI CLI  v${VERSION.padEnd(36)}|
|                                                                        |
|  2D Pixel Game UI Component Registry                                   |
|  Supported frameworks: Next.js, Vite                                   |
+------------------------------------------------------------------------+

  USAGE
  -----
    $ npx @1zuku/jui <command> [options]
    $ npx jui        <command> [options]

  COMMANDS
  --------
    add  <component...>    Add one or more components to your project
    list                   List all available components in the registry
    init                   Initialize JUI configuration and utility helpers

  OPTIONS FOR  init
  -----------------
    -f, --framework <n>    Target framework: next  or  vite
    -y, --yes              Skip confirmation prompt

  OPTIONS FOR  add
  ----------------
    -f, --flavor <type>    Flavor: pixel | modern | both  (default: both)
    -y, --overwrite        Overwrite existing component files
    -p, --path <dir>       Custom base components directory
    --all                  Add all available components

  GENERAL
  -------
    -v, --version          Show CLI version
    -h, --help             Show this help text

  EXAMPLES
  --------
    $ npx @1zuku/jui init
    $ npx @1zuku/jui init -f next
    $ npx @1zuku/jui init -f vite -y
    $ npx @1zuku/jui add button
    $ npx @1zuku/jui add button input card
    $ npx @1zuku/jui add dialog drawer toast -y
    $ npx @1zuku/jui add --all
    $ npx @1zuku/jui list
`;

function parseArgs(args) {
  const parsed = {
    command: null,
    components: [],
    flavor: "both",
    framework: null,
    overwrite: false,
    yes: false,
    path: null,
    all: false,
    help: false,
    version: false,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg === "-h" || arg === "--help" || arg === "help") {
      parsed.help = true;
    } else if (arg === "-v" || arg === "--version") {
      parsed.version = true;
    } else if (arg === "-f" || arg === "--framework" || arg === "--flavor") {
      const val = args[++i]?.toLowerCase() || "";
      parsed.framework = val;
      parsed.flavor = val;
    } else if (arg === "-y" || arg === "--overwrite" || arg === "--yes") {
      parsed.overwrite = true;
      parsed.yes = true;
    } else if (arg === "-p" || arg === "--path") {
      parsed.path = args[++i];
    } else if (arg === "--all") {
      parsed.all = true;
    } else if (!parsed.command) {
      parsed.command = arg;
    } else {
      parsed.components.push(arg.toLowerCase());
    }
    i++;
  }

  return parsed;
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function normalizeFramework(name) {
  if (!name) return null;
  const lower = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (lower.includes("next")) return "Next.js";
  if (lower.includes("vite")) return "Vite";
  return name;
}

function detectFramework(cwd) {
  try {
    const pkgPath = path.join(cwd, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (allDeps.next) return "Next.js";
      if (allDeps.vite) return "Vite";
    }
  } catch {}
  return null;
}

function askConfirm(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      const trimmed = answer.trim().toLowerCase();
      resolve(trimmed === "" || trimmed === "y" || trimmed === "yes");
    });
  });
}

function askInput(question, defaultValue = "") {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      const trimmed = answer.trim();
      resolve(trimmed || defaultValue);
    });
  });
}

function getPackageManager() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("bun") || typeof Bun !== "undefined") return "bun";
  if (ua.startsWith("pnpm")) return "pnpm";
  if (ua.startsWith("yarn")) return "yarn";
  try {
    execSync("bun --version", { stdio: "ignore" });
    return "bun";
  } catch {}
  return "npm";
}

function displayFrameworkUsage(framework) {
  if (framework === "Next.js") {
    console.log(`
+------------------------------------------------------------------------+
|  HOW TO USE JUI IN NEXT.JS  (App Router / Pages)                      |
+------------------------------------------------------------------------+
|                                                                        |
|  1. Import global CSS in app/layout.tsx:                               |
|       import "@/app/globals.css";                                      |
|                                                                        |
|  2. Import pixel primitives in any component:                          |
|       import { PixelButton } from "@/components/pixel/button";         |
|       import { PixelAvatar } from "@/components/pixel/avatar";         |
|       import { PixelCard, PixelCardHeader,                             |
|                PixelCardTitle, PixelCardContent }                      |
|           from "@/components/pixel/card";                              |
|                                                                        |
|     export default function GamePage() {                               |
|       return (                                                         |
|         <PixelCard className="max-w-md m-6">                          |
|           <PixelCardHeader>                                            |
|             <PixelCardTitle>HERO ROSTER</PixelCardTitle>               |
|           </PixelCardHeader>                                           |
|           <PixelCardContent className="space-y-4">                    |
|             <PixelAvatar name="ShadowKnight" size="lg" />             |
|             <PixelButton>ENTER DUNGEON</PixelButton>                  |
|           </PixelCardContent>                                          |
|         </PixelCard>                                                   |
|       );                                                               |
|     }                                                                  |
|                                                                        |
|  3. Add more components at any time:                                   |
|       $ npx @1zuku/jui add button card avatar dialog toast             |
|                                                                        |
+------------------------------------------------------------------------+
`);
  } else if (framework === "Vite") {
    console.log(`
+------------------------------------------------------------------------+
|  HOW TO USE JUI IN VITE  (React + TypeScript)                         |
+------------------------------------------------------------------------+
|                                                                        |
|  1. Path alias '@' is configured in vite.config.ts:                   |
|       import { defineConfig } from "vite";                             |
|       import react from "@vitejs/plugin-react";                        |
|       import path from "node:path";                                    |
|                                                                        |
|       export default defineConfig({                                    |
|         plugins: [react()],                                            |
|         resolve: {                                                     |
|           alias: { "@": path.resolve(__dirname, "./src") }             |
|         },                                                             |
|       });                                                              |
|                                                                        |
|  2. tsconfig.json paths alias is also set:                             |
|       "compilerOptions": {                                             |
|         "baseUrl": ".",                                                |
|         "paths": { "@/*": ["./src/*"] }                               |
|       }                                                                |
|                                                                        |
|  3. Import pixel primitives in src/App.tsx:                            |
|       import { PixelButton } from "@/components/pixel/button";         |
|       import { PixelCard, PixelCardHeader,                             |
|                PixelCardTitle, PixelCardContent }                      |
|           from "@/components/pixel/card";                              |
|                                                                        |
|  4. Add more components at any time:                                   |
|       $ npx @1zuku/jui add button card avatar dialog toast             |
|                                                                        |
+------------------------------------------------------------------------+
`);
  } else {
    console.log(`
+------------------------------------------------------------------------+
|  HOW TO USE JUI  (Next.js or Vite)                                    |
+------------------------------------------------------------------------+
|                                                                        |
|  Next.js:                                                              |
|    $ npx @1zuku/jui init -f next                                       |
|    Import primitives from "@/components/pixel/*"                       |
|                                                                        |
|  Vite:                                                                 |
|    $ npx @1zuku/jui init -f vite                                       |
|    Configure '@' alias in vite.config.ts                               |
|    Then import from "@/components/pixel/*"                             |
|                                                                        |
|  Add components:                                                       |
|    $ npx @1zuku/jui add button card avatar dialog toast                |
|                                                                        |
+------------------------------------------------------------------------+
`);
  }
}

async function initCommand(cwd, options = {}) {
  console.log("\n+--[ JUI INIT ]" + "-".repeat(58) + "+");
  console.log("|  Initializing JUI in your project...                                  |");
  console.log("|  Supported: Next.js, Vite                                             |");
  console.log("+" + "-".repeat(72) + "+\n");

  const pkgPath = path.join(cwd, "package.json");
  const hasExistingProject = fs.existsSync(pkgPath);

  let framework = null;
  if (options.framework) {
    const norm = normalizeFramework(options.framework);
    if (norm === "Next.js" || norm === "Vite") {
      framework = norm;
      console.log(`  [>>] Target framework : ${framework}`);
    } else {
      console.log(`  [!!] Unknown framework '${options.framework}'. Defaulting to Next.js.`);
      framework = "Next.js";
    }
  } else if (hasExistingProject) {
    framework = detectFramework(cwd);
    if (framework) {
      console.log(`  [>>] Detected framework : ${framework}`);
    }
  }

  // If no project exists in cwd, scaffold the project
  if (!hasExistingProject) {
    console.log("  [--] No existing package.json found in this directory.");

    if (!framework) {
      if (options.yes) {
        framework = "Next.js";
      } else {
        const choice = await askInput(
          "\n  Select framework to create:\n    1) Next.js (App Router, Tailwind CSS, TypeScript)\n    2) Vite    (React, TypeScript)\n  Enter 1 or 2 [default: 1]: ",
          "1"
        );
        framework = choice === "2" ? "Vite" : "Next.js";
      }
      console.log(`  [>>] Selected framework : ${framework}`);
    }

    if (!options.overwrite && !options.yes) {
      const proceed = await askConfirm(
        `\n  Create a new ${framework} project with JUI in this directory? [Y/n]: `
      );
      if (!proceed) {
        console.log("\n  [--] Project creation cancelled.\n");
        return;
      }
    }

    const pm = getPackageManager();
    console.log(`\n  [>>] Scaffolding ${framework} project using ${pm}...`);

    // Remove any leftover empty lib/ created earlier so create-app won't conflict
    const existingLib = path.join(cwd, "lib");
    if (fs.existsSync(existingLib)) {
      try {
        fs.rmSync(existingLib, { recursive: true, force: true });
      } catch {}
    }

    if (framework === "Next.js") {
      try {
        let scaffoldCmd;
        if (pm === "bun") {
          scaffoldCmd = "bun create next-app . --typescript --tailwind --eslint --app --import-alias \"@/*\" --use-bun --yes";
        } else if (pm === "pnpm") {
          scaffoldCmd = "pnpm create next-app . --typescript --tailwind --eslint --app --import-alias \"@/*\" --use-pnpm --yes";
        } else {
          scaffoldCmd = "npx -y create-next-app@latest . --typescript --tailwind --eslint --app --import-alias \"@/*\" --use-npm --yes";
        }
        console.log(`\n  $ ${scaffoldCmd}\n`);
        execSync(scaffoldCmd, { cwd, stdio: "inherit" });

        console.log(`\n  [>>] Installing JUI packages and peer dependencies...`);
        const addDepCmd = pm === "bun"
          ? "bun add clsx tailwind-merge lucide-react pixelarticons && bun add -d @1zuku/jui"
          : pm === "pnpm"
          ? "pnpm add clsx tailwind-merge lucide-react pixelarticons && pnpm add -D @1zuku/jui"
          : "npm install clsx tailwind-merge lucide-react pixelarticons && npm install -D @1zuku/jui";
        console.log(`  $ ${addDepCmd}\n`);
        execSync(addDepCmd, { cwd, stdio: "inherit" });

        addCommand(["button", "card", "avatar"], { flavor: "pixel", overwrite: true }, cwd);
      } catch (err) {
        console.error(`\n  [!!] Failed to scaffold Next.js project: ${err.message}`);
        return;
      }
    } else if (framework === "Vite") {
      try {
        let scaffoldCmd;
        if (pm === "bun") {
          scaffoldCmd = "bun create vite . --template react-ts --no-immediate";
        } else if (pm === "pnpm") {
          scaffoldCmd = "pnpm create vite . --template react-ts --no-immediate";
        } else {
          scaffoldCmd = "npm create vite@latest . -- --template react-ts --no-immediate";
        }
        console.log(`\n  $ ${scaffoldCmd}\n`);
        execSync(scaffoldCmd, { cwd, stdio: "inherit" });

        console.log(`\n  [>>] Installing dependencies, Tailwind CSS, and JUI packages...`);
        const addDepCmd = pm === "bun"
          ? "bun install && bun add clsx tailwind-merge lucide-react pixelarticons @tailwindcss/vite tailwindcss && bun add -d @1zuku/jui"
          : pm === "pnpm"
          ? "pnpm install && pnpm add clsx tailwind-merge lucide-react pixelarticons @tailwindcss/vite tailwindcss && pnpm add -D @1zuku/jui"
          : "npm install && npm install clsx tailwind-merge lucide-react pixelarticons @tailwindcss/vite tailwindcss && npm install -D @1zuku/jui";
        console.log(`  $ ${addDepCmd}\n`);
        execSync(addDepCmd, { cwd, stdio: "inherit" });

        // Configure vite.config.ts with path alias and tailwindcss plugin
        const viteConfigPath = path.join(cwd, "vite.config.ts");
        const viteConfigContent = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`;
        fs.writeFileSync(viteConfigPath, viteConfigContent, "utf-8");

        // Ensure authentic JUI tokens & bevels in src/index.css
        const indexCssPath = path.join(cwd, "src", "index.css");
        const pixelCss = `@import "tailwindcss";

:root {
  --cream: #FFF8F0;
  --cream-light: #FFFCF9;
  --cream-dark: #F5E8D8;
  --caramel: #C08552;
  --caramel-hover: #AF7644;
  --cinnamon: #8C5A3C;
  --espresso: #4B2E2B;
  --espresso-deep: #321C1A;

  --destructive: #B84A39;
  --destructive-foreground: #FFF8F0;
  --success: #4F6D48;
  --success-foreground: #FFF8F0;
  --warning: #D48B38;
  --warning-foreground: #321C1A;

  --background: var(--cream);
  --foreground: var(--espresso);
  --surface: #FFFFFF;
  --surface-card: #FFFFFF;
  --ring: var(--caramel);
}

.pixel-border-bevel {
  box-shadow:
    -2px 0 0 0 var(--espresso),
    2px 0 0 0 var(--espresso),
    0 -2px 0 0 var(--espresso),
    0 2px 0 0 var(--espresso),
    inset -2px -2px 0 0 var(--cinnamon),
    inset 2px 2px 0 0 var(--cream);
}

.pixel-btn-bevel {
  box-shadow:
    -2px 0 0 0 var(--espresso),
    2px 0 0 0 var(--espresso),
    0 -2px 0 0 var(--espresso),
    0 2px 0 0 var(--espresso),
    inset -2px -2px 0 0 var(--cinnamon),
    inset 2px 2px 0 0 var(--cream);
  transition: transform 0.05s steps(1);
}

.pixel-btn-bevel:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow:
    -2px 0 0 0 var(--espresso),
    2px 0 0 0 var(--espresso),
    0 -2px 0 0 var(--espresso),
    0 2px 0 0 var(--espresso),
    inset 2px 2px 0 0 var(--espresso),
    inset -2px -2px 0 0 var(--cream);
}
`;
        fs.writeFileSync(indexCssPath, pixelCss, "utf-8");

        // Configure tsconfig.app.json or tsconfig.json for @/* path alias
        const tsconfigAppPath = path.join(cwd, "tsconfig.app.json");
        const tsconfigPath = path.join(cwd, "tsconfig.json");
        const targetTsconfig = fs.existsSync(tsconfigAppPath)
          ? tsconfigAppPath
          : fs.existsSync(tsconfigPath)
          ? tsconfigPath
          : null;
        if (targetTsconfig) {
          try {
            const rawTs = fs.readFileSync(targetTsconfig, "utf-8");
            const tsJson = JSON.parse(rawTs);
            tsJson.compilerOptions = tsJson.compilerOptions || {};
            tsJson.compilerOptions.baseUrl = ".";
            tsJson.compilerOptions.paths = tsJson.compilerOptions.paths || {};
            tsJson.compilerOptions.paths["@/*"] = ["./src/*"];
            fs.writeFileSync(targetTsconfig, JSON.stringify(tsJson, null, 2), "utf-8");
          } catch {}
        }

        addCommand(["button", "card", "avatar"], { flavor: "pixel", overwrite: true }, cwd);

        // Replace src/App.tsx with JUI starter showcase
        const appTsxPath = path.join(cwd, "src", "App.tsx");
        const starterAppTsx = `import { PixelButton } from "@/components/pixel/button";
import { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardContent } from "@/components/pixel/card";
import { PixelAvatar } from "@/components/pixel/avatar";

export function App() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#4B2E2B] flex items-center justify-center p-6">
      <PixelCard className="max-w-md w-full">
        <PixelCardHeader>
          <PixelCardTitle>JUI PIXEL ADVENTURE</PixelCardTitle>
        </PixelCardHeader>
        <PixelCardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <PixelAvatar name="ShadowKnight" size="lg" />
            <div>
              <p className="font-bold text-sm">Shadow Knight</p>
              <p className="text-xs text-[#8C5A3C]">Level 42 Paladin</p>
            </div>
          </div>
          <PixelButton className="w-full">ENTER DUNGEON</PixelButton>
        </PixelCardContent>
      </PixelCard>
    </div>
  );
}

export default App;
`;
        fs.writeFileSync(appTsxPath, starterAppTsx, "utf-8");
      } catch (err) {
        console.error(`\n  [!!] Failed to scaffold Vite project: ${err.message}`);
        return;
      }
    }
  } else {
    // Existing project
    if (!options.overwrite && !options.yes) {
      const proceed = await askConfirm("  Initialize JUI in this existing project? [Y/n]: ");
      if (!proceed) {
        console.log("\n  [--] Initialization cancelled.\n");
        return;
      }
    }
  }

  // Create lib/utils.ts
  const utilsPath = path.join(cwd, "lib", "utils.ts");
  if (!fs.existsSync(utilsPath) || options.overwrite) {
    ensureDirSync(path.dirname(utilsPath));
    fs.writeFileSync(utilsPath, registry.shared.utils.content, "utf-8");
    console.log(`  [OK] Created ${path.relative(cwd, utilsPath)}  (cn helper utility)`);
  } else {
    console.log(`  [--] Found existing ${path.relative(cwd, utilsPath)}`);
  }

  // Also create src/lib/utils.ts if src directory exists
  if (fs.existsSync(path.join(cwd, "src"))) {
    const srcUtilsPath = path.join(cwd, "src", "lib", "utils.ts");
    if (!fs.existsSync(srcUtilsPath) || options.overwrite) {
      ensureDirSync(path.dirname(srcUtilsPath));
      fs.writeFileSync(srcUtilsPath, registry.shared.utils.content, "utf-8");
      console.log(`  [OK] Created ${path.relative(cwd, srcUtilsPath)}  (cn helper utility)`);
    }
  }

  console.log("\n  [OK] JUI initialized successfully!\n");

  // Check for missing peer dependencies
  try {
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      const missingPeers = ["clsx", "tailwind-merge", "lucide-react", "pixelarticons"].filter(
        (d) => !allDeps[d]
      );
      if (missingPeers.length > 0) {
        const pm = getPackageManager();
        const installCmd =
          pm === "bun" ? "bun add" : pm === "pnpm" ? "pnpm add" : "npm install";
        console.log("  [!!] Missing peer dependencies. Install them with:");
        console.log(`       $ ${installCmd} ${missingPeers.join(" ")}\n`);
      }
    }
  } catch {}

  displayFrameworkUsage(framework);
}

function listCommand() {
  const compKeys = Object.keys(registry.components).sort();
  const total = compKeys.length;

  console.log("\n+" + "-".repeat(72) + "+");
  console.log("|  JUI COMPONENT REGISTRY" + " ".repeat(48) + "|");
  console.log("|  " + `${total} components available`.padEnd(70) + "|");
  console.log("+" + "-".repeat(72) + "+");

  // 3-column grid, each column 22 chars wide
  const colW = 22;
  const cols = 3;
  for (let i = 0; i < total; i += cols) {
    let rowStr = "|  ";
    for (let c = 0; c < cols; c++) {
      const name = compKeys[i + c] ?? "";
      const prefix = name ? "[+] " : "    ";
      rowStr += (prefix + name).padEnd(colW);
    }
    // close the box at column 73
    console.log(rowStr.slice(0, 73) + "|");
  }

  console.log("+" + "-".repeat(72) + "+");
  console.log("|  FLAVORS                                                               |");
  console.log("|    [M] Modern  -- SaaS aesthetic, Geist / clean typography            |");
  console.log("|    [P] Pixel   -- 8-bit / 16-bit retro aesthetic, tactile bevels      |");
  console.log("+" + "-".repeat(72) + "+");
  console.log("|  Add a component:                                                      |");
  console.log("|    $ npx jui add <component-name>                                      |");
  console.log("+" + "-".repeat(72) + "+\n");
}

function addCommand(componentsToInstall, options, cwd) {
  if (options.all) {
    componentsToInstall = Object.keys(registry.components);
  }

  if (componentsToInstall.length === 0) {
    console.error("\n  [!!] Please specify at least one component to add, or use --all.");
    console.log("       Example: $ npx jui add button\n");
    process.exit(1);
  }

  const validFlavors = ["modern", "pixel", "both"];
  if (!validFlavors.includes(options.flavor)) {
    console.error(`\n  [!!] Invalid flavor '${options.flavor}'. Allowed: modern | pixel | both\n`);
    process.exit(1);
  }

  const headerLabel = `  Adding ${componentsToInstall.length} component(s)  [flavor: ${options.flavor}]`;
  console.log(`\n+--[ JUI ADD ]` + "-".repeat(59) + "+");
  console.log("|" + headerLabel.padEnd(72) + "|");
  console.log("+" + "-".repeat(72) + "+\n");

  // Ensure lib/utils.ts exists
  const hasSrc = fs.existsSync(path.join(cwd, "src"));
  const utilsPath = path.join(cwd, "lib", "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    ensureDirSync(path.dirname(utilsPath));
    fs.writeFileSync(utilsPath, registry.shared.utils.content, "utf-8");
    console.log(`  [OK] Scaffolded ${path.relative(cwd, utilsPath)}`);
  }
  if (hasSrc) {
    const srcUtilsPath = path.join(cwd, "src", "lib", "utils.ts");
    if (!fs.existsSync(srcUtilsPath)) {
      ensureDirSync(path.dirname(srcUtilsPath));
      fs.writeFileSync(srcUtilsPath, registry.shared.utils.content, "utf-8");
      console.log(`  [OK] Scaffolded ${path.relative(cwd, srcUtilsPath)}`);
    }
  }

  const defaultBase = hasSrc
    ? path.join(cwd, "src", "components")
    : path.join(cwd, "components");
  const baseComponentsDir = options.path ? path.resolve(cwd, options.path) : defaultBase;
  const modernDir = path.join(baseComponentsDir, "ui");
  const pixelDir = path.join(baseComponentsDir, "pixel");

  const requiredNpmDeps = new Set(["clsx", "tailwind-merge"]);
  let installedCount = 0;
  let copiedPixelIcons = false;

  for (const compSlug of componentsToInstall) {
    const compData = registry.components[compSlug];
    if (!compData) {
      console.warn(`  [!!] Component '${compSlug}' not found in registry -- skipping.`);
      continue;
    }

    for (const dep of compData.dependencies || []) {
      requiredNpmDeps.add(dep);
    }

    // 1. Modern flavor
    if (options.flavor === "modern" || options.flavor === "both") {
      if (compData.files.modern) {
        const destFile = path.join(modernDir, `${compSlug}.tsx`);
        ensureDirSync(path.dirname(destFile));

        if (fs.existsSync(destFile) && !options.overwrite) {
          console.log(`  [--] Skipped  components/ui/${compSlug}.tsx  (exists, use -y to overwrite)`);
        } else {
          fs.writeFileSync(destFile, compData.files.modern.content, "utf-8");
          console.log(`  [OK] Created  components/ui/${compSlug}.tsx`);
          installedCount++;
        }
      }
    }

    // 2. Pixel flavor
    if (options.flavor === "pixel" || options.flavor === "both") {
      if (compData.files.pixel) {
        if (compData.registryDependencies?.includes("pixel-icons") && !copiedPixelIcons) {
          const pixelIconsDest = path.join(pixelDir, "icons.tsx");
          if (!fs.existsSync(pixelIconsDest) || options.overwrite) {
            ensureDirSync(path.dirname(pixelIconsDest));
            if (registry.shared["pixel-icons"]?.content) {
              fs.writeFileSync(pixelIconsDest, registry.shared["pixel-icons"].content, "utf-8");
              console.log(`  [OK] Created  components/pixel/icons.tsx  (shared pixel icons)`);
              copiedPixelIcons = true;
            }
          }
        }

        const destFile = path.join(pixelDir, `${compSlug}.tsx`);
        ensureDirSync(path.dirname(destFile));

        if (fs.existsSync(destFile) && !options.overwrite) {
          console.log(`  [--] Skipped  components/pixel/${compSlug}.tsx  (exists, use -y to overwrite)`);
        } else {
          fs.writeFileSync(destFile, compData.files.pixel.content, "utf-8");
          console.log(`  [OK] Created  components/pixel/${compSlug}.tsx`);
          installedCount++;
        }
      }
    }
  }

  console.log(`\n  [**] Done -- ${installedCount} file(s) written.`);
  if (requiredNpmDeps.size > 0) {
    console.log("\n  Ensure required dependencies are installed in your project:");
    console.log(`    $ npm install ${Array.from(requiredNpmDeps).join(" ")}\n`);
  }
}

// Main execution
const rawArgs = process.argv.slice(2);
const options = parseArgs(rawArgs);

if (options.help || (rawArgs.length === 0 && !options.command)) {
  console.log(HELP_TEXT);
  process.exit(0);
}

if (options.version) {
  console.log(`jui v${VERSION}`);
  process.exit(0);
}

const cwd = process.cwd();

switch (options.command) {
  case "init":
    await initCommand(cwd, options);
    break;
  case "list":
  case "ls":
    listCommand();
    break;
  case "add":
    addCommand(options.components, options, cwd);
    break;
  default:
    console.error(`\n  [!!] Unknown command: '${options.command}'`);
    console.log(HELP_TEXT);
    process.exit(1);
}
