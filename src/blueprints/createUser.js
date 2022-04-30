const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "createUser";
const description = "execute createUser";

const nodes = [
  {
    nodeSpec: "startCreateUser",
    id: "START",
    next: "CONFIG",
  }, {
    nodeSpec: "config",
    id: "CONFIG",
    next: "INFORM-USER-DATA",
  }, {
    nodeSpec: "informUserData",
    id: "INFORM-USER-DATA",
    next: "GET-PROFILE",
  }, {
    nodeSpec: "getProfile",
    id: "GET-PROFILE",
    next: "HAS-PROFILE",
  }, {
    nodeSpec: "hasProfile",
    id: "HAS-PROFILE"
  }, {
    nodeSpec: "createUser",
    id: "CREATE-USER",
    next: "CREATE-PROFILE"
  }, {
    nodeSpec: "createProfile",
    id: "CREATE-PROFILE",
    next: "NOTIFY-SUCCESS"
  }, {
    nodeSpec: "notifyUser",
    id: "NOTIFY-SUCCESS",
    next: "END"
  }, {
    nodeSpec: "notifyUser",
    id: "NOTIFY-ALREADY-EXISTS",
    next: "END-ERROR"
  }, {
    nodeSpec: 'end'
  }, {
    nodeSpec: 'endError'
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
      RPC_URL: "RPC_URL",
      POSTGREST_URL: "POSTGREST_URL"
    },
  },
};
