const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "login";
const description = "authenticate and redirect and anonymous user to the application"

const nodes = [
  {
    nodeSpec: "startLogin",
  },
  {
    nodeSpec: "login",
    next: "CHECK-LOGIN-RESPONSE", 
  },
  {
    nodeSpec: "checkLoginResponse",
  },
  {
    nodeSpec: "redirectToApplication",
    next: "FINISH-LOGIN-SUCCESS",
  },
  {
    nodeSpec: "finishLoginSuccess",
  },
  {
    nodeSpec: "alertLoginError",
    next: "FINISH-LOGIN-ERROR",
  },
  {
    nodeSpec: "finishLoginError",
  }
];

module.exports = {
  name: name,
  description: description,
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes: getNodes(nodes),
    lanes: getLanes(getNodes(nodes)),
    environment: {
      BASE_URL: "BASE_URL",
    },
  },
};