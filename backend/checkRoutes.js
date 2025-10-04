const fs = require("fs");
const path = require("path");

// Folder where your route files are stored
const ROUTES_DIR = path.join(__dirname, "routes");

// Regex to match route definitions: app.get('/path', ...)
const ROUTE_REGEX = /(app\.(get|post|put|delete|patch))\s*\(\s*['"`]([^'"`]+)['"`]/g;

let missingParams = [];

// Loop through all files in the routes folder
fs.readdirSync(ROUTES_DIR).forEach((file) => {
  if (file.endsWith(".js")) {
    const filePath = path.join(ROUTES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");

    let match;
    while ((match = ROUTE_REGEX.exec(content)) !== null) {
      const routePath = match[3];

      // Check for : without a name (like "/api/:/something")
      if (/\/:\/|\/:\s|\/:$/.test(routePath)) {
        missingParams.push({ file: file, route: routePath });
      }
    }
  }
});

if (missingParams.length === 0) {
  console.log("✅ No routes with missing parameters detected!");
} else {
  console.log("⚠️ Routes with missing parameters found:");
  missingParams.forEach((r) =>
    console.log(`File: ${r.file}, Route: ${r.route}`)
  );
}
