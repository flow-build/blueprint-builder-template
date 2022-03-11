const fs = require("fs");
const path = require("path");
const { logger } = require("./logger");

const specDirectory = "src/nodes/specs";
const examplesDirectory = "src/nodes/examples";
const schemasDirectory = "src/nodes/schemas";

const nodeList = () => {
  try {
    const files = fs.readdirSync(specDirectory);
    const response = [];
    for (const file of files) {
      if (!file.startsWith("meta")) {
        response.push(path.basename(`${specDirectory}/${file}`, ".js"));
      }
    }
    return response;
  } catch (e) {
    return e;
  }
};

const getExample = (nodeName) => {
  try {
    const name = path.basename(`${examplesDirectory}/${nodeName}`, ".js");
    const spec = require(`../../${examplesDirectory}/${name}`);
    return spec;
  } catch (e) {
    logger.warn(`unable to getExample from ${nodeName}`);
    logger.verbose(e);
    return {};
  }
};

const getSchema = (nodeName) => {
  try {
    const name = path.basename(`${schemasDirectory}/${nodeName}`, ".js");
    const spec = require(`../../${schemasDirectory}/${name}`);
    return spec;
  } catch (e) {
    return e;
  }
};

const getNode = (nodeName) => {
  try {
    const file = path.basename(`${specDirectory}/${nodeName}`, ".js");
    const spec = require(`../../${specDirectory}/${file}`);
    return spec;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  nodeList,
  getExample,
  getSchema,
  getNode,
};
