const fs = require("fs");
const path = require("path");
const JSum = require("jsum");
const { logger } = require("../src/utils/logger");

const blueprintDir = "src/blueprints";
const destination = "export/blueprints";

if (!fs.existsSync("export")) {
  fs.mkdirSync("export");
}

if (!fs.existsSync("export/blueprints")) {
  fs.mkdirSync("export/blueprints");
}

if (!fs.existsSync("download")) {
  fs.mkdirSync("download");
}

logger.debug("starting export");

fs.readdir(blueprintDir, async (err, files) => {
  if (err) {
    logger.error("Unable to find blueprints directory");
    process.exit(1);
  }

  const summary = [];
  files.forEach(async (file) => {
    if (path.extname(`../${blueprintDir}/${file}`) === ".js") {
      logger.verbose(`Start ${file} analysis`);

      const scriptName = path.basename(`../${blueprintDir}/${file}`, ".js");
      const spec = require(`../${blueprintDir}/${scriptName}`);
      fs.writeFileSync(`${destination}/${spec.name}.json`, JSON.stringify(spec, null, 2));

      logger.info(`Exporting ${file} to ${spec.name}.json!`);

      summary.push({
        name: spec.name,
        created_at: new Date(),
        version: 0,
        hash: JSum.digest(spec.blueprint_spec, "SHA256", "hex"),
      });

      return {
        name: spec.name,
        created_at: new Date(),
        version: 0,
        hash: JSum.digest(spec.blueprint_spec, "SHA256", "hex"),
      };
    }
  });
});