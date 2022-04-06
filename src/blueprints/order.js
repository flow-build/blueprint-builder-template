const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "order";
const description = "create an order";

const nodes = [
  {
    nodeSpec: "startOrder",
    id: "START",
    next: "CONFIG",
  }, {
    nodeSpec: "config",
    id: 'CONFIG',
    next: 'GET-CART'
  }, {
    nodeSpec: "getCart",
    id: "GET-CART",
    next: "GET-PAYMENT-OPTIONS"
  }, {
    nodeSpec: "getPaymentOptions",
    id: "GET-PAYMENT-OPTIONS",
    next: 'SELECT-PAYMENT'
  }, {
    nodeSpec: "selectPayment",
    id: 'SELECT-PAYMENT',
    next: 'CREATE-ORDER'
  }, {
    nodeSpec: "createOrder",
    id: 'CREATE-ORDER',
    next: 'START-PAYMENT'
  }, {
    nodeSpec: "startPaymentProcess",
    id: 'START-PAYMENT',
    next: 'GET-ORDER'
  }, {
    nodeSpec: "getOrder",
    id: 'GET-ORDER',
    next: 'IS-ALL-DELIVERED'
  }, {
    nodeSpec: "isAllDelivered",
    id: 'IS-ALL-DELIVERED'
  }, {
    nodeSpec: "waitForUpdates",
    id: 'WAIT-FOR-UPDATES',
    next: 'GET-ORDER'
  }, {
    nodeSpec: "end"
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
