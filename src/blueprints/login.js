const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "login";
const description = "login user";

const nodes = [
  {
    nodeSpec: "startLogin",
    id: "START",
    next: "CONFIG",
  }, {
    nodeSpec: "config",
    id: 'CONFIG',
    next: 'INFORM-CREDENTIALS'
  }, {
    nodeSpec: "informCredentials",
    id: 'INFORM-CREDENTIALS',
    next: 'AUTH'
  }, {
    nodeSpec: 'auth',
    id: 'AUTH',
    next: 'AUTH-RESPONSE'
  }, {
    nodeSpec: 'authResponse',
    id: 'AUTH-RESPONSE'
  }, {
    nodeSpec: 'generateToken',
    id: 'GENERATE-TOKEN',
    next: 'SEND-SMS'
  }, {
    nodeSpec: 'sendSms',
    id: 'SEND-SMS',
    next: 'CONFIRM-TOKEN'
  }, {
    nodeSpec: 'confirmToken',
    id: 'CONFIRM-TOKEN',
    next: 'IS-TOKEN-VALID'
  }, {
    nodeSpec: 'isTokenValid',
    id: 'IS-TOKEN-VALID'
  }, {
    nodeSpec: 'notifyUser',
    id: 'NOTIFY-USER',
    next: 'END-ERROR',
    parameters: {
      input: {
        message: 'Dados Inválidos'
      }
    }
  }, {
    nodeSpec: 'createJwt',
    id: 'CREATE-JWT',
    next: 'DELIVER-JWT'
  }, {
    nodeSpec: 'deliverJwt',
    id: 'DELIVER-JWT',
    next: 'END'
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
    environment: {},
  },
};
