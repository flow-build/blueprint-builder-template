const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "testBlueprint";
const description = "execute tests";

const nodes = [
  {
    nodeSpec: "startTest",
    id: "START-TEST",
    next: "CONFIG-TEST",
  }, 
  {
    nodeSpec: "configTest",
    id: "CONFIG-TEST",
    next: "NOTIFY-TEST",
  }, 
  {
    nodeSpec: "notifyTest",
    id: "NOTIFY-TEST",
    next: "END-TEST",
  },
  {
    nodeSpec: "endTest"
  },
];

module.exports = {
  name: name,
  description: description,
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes: getNodes(nodes),
    lanes: getLanes(getNodes(nodes)),
    environment: {},
  },
};