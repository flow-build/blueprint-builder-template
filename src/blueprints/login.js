const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "login";
const description = "login user";

const nodes = [
  {
    nodeSpec: "startLogin",
    id: "START",
    next: "CONFIG",
  },
  {
    nodeSpec: "config",
    id: "CONFIG",
    next: "INFORM-CREDENTIALS",
  },
  {
    nodeSpec: "informCredentials",
    id: "INFORM-CREDENTIALS",
    next: "AUTH",
  },
  {
    nodeSpec: "auth",
    id: "AUTH",
    next: "AUTH-RESPONSE",
  },
  {
    nodeSpec: "authResponse",
    id: "AUTH-RESPONSE",
  },
  {
    nodeSpec: "getUserByExternalID",
    id: "GET-USER-BY-EXTERNAL-ID",
    next: "GENERATE-TOKEN",
  },
  {
    nodeSpec: "generateToken",
    id: "GENERATE-TOKEN",
    next: "SEND-SMS",
  },
  {
    nodeSpec: "sendSms",
    id: "SEND-SMS",
    next: "CONFIRM-TOKEN",
    parameters: {
      input: {
        Body: { $mustache: "Seu token para acesso é {{bag.token}}" },
      },
    },
  },
  {
    nodeSpec: "confirmToken",
    id: "CONFIRM-TOKEN",
    next: "IS-TOKEN-VALID",
  },
  {
    nodeSpec: "isTokenValid",
    id: "IS-TOKEN-VALID",
  },
  {
    nodeSpec: "notifyUser",
    id: "NOTIFY-USER",
    next: "END-ERROR",
    parameters: {
      input: {
        message: "Dados Inválidos",
      },
    },
  },
  {
    nodeSpec: "createJwt",
    id: "CREATE-JWT",
    next: "DELIVER-JWT",
  },
  {
    nodeSpec: "deliverJwt",
    id: "DELIVER-JWT",
    next: "END",
  },
  {
    nodeSpec: "end",
  },
  {
    nodeSpec: "endError",
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
    environment: {
      POSTGREST_URL: "POSTGREST_URL",
      SUPERTOKENS_BASE_URL: "SUPERTOKENS_BASE_URL",
      SUPERTOKENS_API_KEY: "SUPERTOKENS_API_KEY",
      TWILIO_ACCOUNT_ID: "TWILIO_ACCOUNT_ID",
      TWILIO_AUTH_TOKEN: "TWILIO_AUTH_TOKEN",
    },
  },
};
