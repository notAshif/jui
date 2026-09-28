import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const UI_DIR = path.join(rootDir, "components", "ui");
const PIXEL_DIR = path.join(rootDir, "components", "pixel");
const UTILS_FILE = path.join(rootDir, "lib", "utils.ts");
const OUTPUT_FILE = path.join(rootDir, "lib", "registry.json");

function getDependencies(content) {
  const deps = new Set();
  if (content.includes("clsx") || content.includes("tailwind-merge")) {
    deps.add("clsx");
    deps.add("tailwind-merge");
  }
  if (content.includes("lucide-react")) {
    deps.add("lucide-react");
  }
  if (content.includes("pixelarticons")) {
    deps.add("pixelarticons");
  }
  return Array.from(deps);
}

function buildRegistry() {
  console.log("Generating JUI Component Registry...");

  const uiFiles = fs.existsSync(UI_DIR)
    ? fs.readdirSync(UI_DIR).filter((f) => f.endsWith(".tsx"))
    : [];
  const pixelFiles = fs.existsSync(PIXEL_DIR)
    ? fs
        .readdirSync(PIXEL_DIR)
        .filter((f) => f.endsWith(".tsx") && f !== "icons.tsx" && f !== "registry.tsx")
    : [];

  const allSlugs = Array.from(
    new Set([
      ...uiFiles.map((f) => path.basename(f, ".tsx")),
      ...pixelFiles.map((f) => path.basename(f, ".tsx")),
    ])
  ).sort();

  const components = {};

  for (const slug of allSlugs) {
    const uiFilePath = path.join(UI_DIR, `${slug}.tsx`);
    const pixelFilePath = path.join(PIXEL_DIR, `${slug}.tsx`);

    const modernContent = fs.existsSync(uiFilePath)
      ? fs.readFileSync(uiFilePath, "utf-8")
      : null;

    const pixelContent = fs.existsSync(pixelFilePath)
      ? fs.readFileSync(pixelFilePath, "utf-8")
      : null;

    const combinedContent = (modernContent || "") + (pixelContent || "");
    const dependencies = getDependencies(combinedContent);

    const registryDependencies = [];
    if (pixelContent && (pixelContent.includes("pixel/icons") || pixelContent.includes("./icons"))) {
      registryDependencies.push("pixel-icons");
    }
    if (combinedContent.includes("avatar-generator")) {
      registryDependencies.push("avatar-generator");
    }

    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    components[slug] = {
      name: slug,
      title,
      dependencies,
      registryDependencies,
      files: {
        modern: modernContent
          ? {
              targetPath: `components/ui/${slug}.tsx`,
              content: modernContent,
            }
          : null,
        pixel: pixelContent
          ? {
              targetPath: `components/pixel/${slug}.tsx`,
              content: pixelContent,
            }
          : null,
      },
    };
  }

  // Shared utilities & helper files
  const shared = {
    utils: {
      targetPath: "lib/utils.ts",
      content: fs.existsSync(UTILS_FILE)
        ? fs.readFileSync(UTILS_FILE, "utf-8")
        : `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`,
      dependencies: ["clsx", "tailwind-merge"],
    },
    "pixel-icons": {
      targetPath: "components/pixel/icons.tsx",
      content: fs.existsSync(path.join(PIXEL_DIR, "icons.tsx"))
        ? fs.readFileSync(path.join(PIXEL_DIR, "icons.tsx"), "utf-8")
        : null,
      dependencies: ["pixelarticons"],
    },
    "avatar-generator": {
      targetPath: "lib/avatar-generator.ts",
      content: fs.existsSync(path.join(rootDir, "lib", "avatar-generator.ts"))
        ? fs.readFileSync(path.join(rootDir, "lib", "avatar-generator.ts"), "utf-8")
        : null,
      dependencies: [],
    },
  };

  const registry = {
    $schema: "https://jui.dev/schema/registry.json",
    name: "jui",
    version: "0.1.0",
    description: "JUI 2D Pixel Game UI component registry",
    totalComponents: Object.keys(components).length,
    components,
    shared,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2), "utf-8");
  console.log(`Registry generated successfully at ${OUTPUT_FILE} with ${Object.keys(components).length} components.`);
}

buildRegistry();
