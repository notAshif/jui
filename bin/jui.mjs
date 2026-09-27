#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
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
    console.error("Registry not found. Please run 'npm run build:registry' first.");
    process.exit(1);
  }
} catch (err) {
  console.error("Failed to load registry:", err.message);
  process.exit(1);
}

const VERSION = registry.version || "0.1.0";

const HELP_TEXT = `
       _ _   _ ___ 
      | | | | |_ _|
   _  | | | | || | 
  | |_| | |_| || | 
   \\___/ \\___/|___|

JUI CLI - Dual-Aesthetic Component Registry (Modern & 2D Pixel)
v${VERSION}

Usage:
  $ npx @1zuku/jui <command> [options]
  $ npx jui <command> [options]

Commands:
  add <component...>    Add one or more components to your project
  list                  List all available components in the registry
  init                  Initialize JUI configuration and utility helpers

Options for 'add':
  -f, --flavor <type>   Component flavor: 'modern', 'pixel', or 'both' (default: 'both')
  -y, --overwrite       Overwrite existing component files without asking
  -p, --path <dir>      Custom base components directory (default: './components')
  --all                 Add all available components to the project

General Options:
  -v, --version         Show CLI version
  -h, --help            Show help documentation

Examples:
  $ npx @1zuku/jui add button
  $ npx @1zuku/jui add button input card --flavor modern
  $ npx @1zuku/jui add dialog drawer toast -f pixel -y
  $ npx @1zuku/jui add --all
  $ npx @1zuku/jui list
`;

function parseArgs(args) {
  const parsed = {
    command: null,
    components: [],
    flavor: "both",
    overwrite: false,
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
    } else if (arg === "-f" || arg === "--flavor") {
      parsed.flavor = args[++i]?.toLowerCase() || "both";
    } else if (arg === "-y" || arg === "--overwrite") {
      parsed.overwrite = true;
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

function initCommand(cwd) {
  console.log("\n📦 Initializing JUI in your project...\n");

  const utilsPath = path.join(cwd, "lib", "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    ensureDirSync(path.dirname(utilsPath));
    fs.writeFileSync(utilsPath, registry.shared.utils.content, "utf-8");
    console.log(`  ✓ Created ${path.relative(cwd, utilsPath)} (cn helper utility)`);
  } else {
    console.log(`  - Found existing ${path.relative(cwd, utilsPath)}`);
  }

  console.log("\n✅ JUI initialized successfully!");
  console.log("Required dependencies:");
  console.log("  $ npm install clsx tailwind-merge lucide-react pixelarticons\n");
}

function listCommand() {
  console.log("\n📋 Available JUI Components (28 Total):\n");
  const compKeys = Object.keys(registry.components).sort();

  const colWidth = 22;
  let row = "  ";
  for (let i = 0; i < compKeys.length; i++) {
    row += compKeys[i].padEnd(colWidth);
    if ((i + 1) % 3 === 0 || i === compKeys.length - 1) {
      console.log(row);
      row = "  ";
    }
  }

  console.log("\nFlavors available for each component:");
  console.log("  • Modern  (SaaS aesthetic, Geist/clean typography)");
  console.log("  • Pixel   (8-bit/16-bit retro aesthetic, tactile bevels)\n");
  console.log("Install a component:");
  console.log("  $ npx jui add <component-name>\n");
}

function addCommand(componentsToInstall, options, cwd) {
  if (options.all) {
    componentsToInstall = Object.keys(registry.components);
  }

  if (componentsToInstall.length === 0) {
    console.error("\n❌ Error: Please specify at least one component to add, or use --all.");
    console.log("Example: $ npx jui add button\n");
    process.exit(1);
  }

  const validFlavors = ["modern", "pixel", "both"];
  if (!validFlavors.includes(options.flavor)) {
    console.error(`\n❌ Error: Invalid flavor '${options.flavor}'. Allowed options: 'modern', 'pixel', 'both'.\n`);
    process.exit(1);
  }

  console.log(`\n🚀 Adding ${componentsToInstall.length} component(s) [Flavor: ${options.flavor}]...\n`);

  // Ensure lib/utils.ts exists
  const utilsPath = path.join(cwd, "lib", "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    ensureDirSync(path.dirname(utilsPath));
    fs.writeFileSync(utilsPath, registry.shared.utils.content, "utf-8");
    console.log(`  ✓ Scaffolding ${path.relative(cwd, utilsPath)}`);
  }

  const baseComponentsDir = options.path ? path.resolve(cwd, options.path) : path.join(cwd, "components");
  const modernDir = path.join(baseComponentsDir, "ui");
  const pixelDir = path.join(baseComponentsDir, "pixel");

  const requiredNpmDeps = new Set(["clsx", "tailwind-merge"]);
  let installedCount = 0;
  let copiedPixelIcons = false;

  for (const compSlug of componentsToInstall) {
    const compData = registry.components[compSlug];
    if (!compData) {
      console.warn(`  ⚠️  Warning: Component '${compSlug}' not found in registry. Skipping.`);
      continue;
    }

    // Accumulate dependencies
    for (const dep of compData.dependencies || []) {
      requiredNpmDeps.add(dep);
    }

    // 1. Install Modern flavor if requested
    if (options.flavor === "modern" || options.flavor === "both") {
      if (compData.files.modern) {
        const destFile = path.join(modernDir, `${compSlug}.tsx`);
        ensureDirSync(path.dirname(destFile));

        if (fs.existsSync(destFile) && !options.overwrite) {
          console.log(`  - Skipped components/ui/${compSlug}.tsx (already exists, pass -y to overwrite)`);
        } else {
          fs.writeFileSync(destFile, compData.files.modern.content, "utf-8");
          console.log(`  ✓ Created components/ui/${compSlug}.tsx`);
          installedCount++;
        }
      }
    }

    // 2. Install Pixel flavor if requested
    if (options.flavor === "pixel" || options.flavor === "both") {
      if (compData.files.pixel) {
        // Ensure pixel icons.tsx is copied if needed
        if (compData.registryDependencies?.includes("pixel-icons") && !copiedPixelIcons) {
          const pixelIconsDest = path.join(pixelDir, "icons.tsx");
          if (!fs.existsSync(pixelIconsDest) || options.overwrite) {
            ensureDirSync(path.dirname(pixelIconsDest));
            if (registry.shared["pixel-icons"]?.content) {
              fs.writeFileSync(pixelIconsDest, registry.shared["pixel-icons"].content, "utf-8");
              console.log(`  ✓ Created components/pixel/icons.tsx (shared pixel icons)`);
              copiedPixelIcons = true;
            }
          }
        }

        const destFile = path.join(pixelDir, `${compSlug}.tsx`);
        ensureDirSync(path.dirname(destFile));

        if (fs.existsSync(destFile) && !options.overwrite) {
          console.log(`  - Skipped components/pixel/${compSlug}.tsx (already exists, pass -y to overwrite)`);
        } else {
          fs.writeFileSync(destFile, compData.files.pixel.content, "utf-8");
          console.log(`  ✓ Created components/pixel/${compSlug}.tsx`);
          installedCount++;
        }
      }
    }
  }

  console.log(`\n✨ Done! Processed ${installedCount} file(s).`);
  if (requiredNpmDeps.size > 0) {
    console.log("\n📦 Ensure required dependencies are installed in your project:");
    console.log(`   npm install ${Array.from(requiredNpmDeps).join(" ")}\n`);
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
    initCommand(cwd);
    break;
  case "list":
  case "ls":
    listCommand();
    break;
  case "add":
    addCommand(options.components, options, cwd);
    break;
  default:
    console.error(`\n❌ Unknown command: '${options.command}'`);
    console.log(HELP_TEXT);
    process.exit(1);
}
