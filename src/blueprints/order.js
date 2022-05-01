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
    nodeSpec: "configOrder",
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
    next: 'CREATE-ORDER-RESPONSE'
  }, {
    nodeSpec: "createOrderResponse",
    id: 'CREATE-ORDER-RESPONSE',
    next: {
      422: 'NOTIFY-USER',
      default: 'APPEND-TRACE-ORDER'
    }
  }, {
    nodeSpec: "appendTrace",
    id: "APPEND-TRACE-ORDER",
    name: "APPEND-TRACE-ORDER",
    next: "START-PAYMENT",
    parameters: {
      input: {
        event: "Order Created"
      }
    }
  }, {
    nodeSpec: "startPaymentProcess",
    id: 'START-PAYMENT',
    next: 'APPEND-TRACE-PAYMENT'
  }, {
    nodeSpec: "appendTrace",
    id: "APPEND-TRACE-PAYMENT",
    name: "APPEND-TRACE-PAYMENT",
    next: "END-ORDER-SUCCESS",
    parameters: {
      input: {
        event: "Order sent to payment"
      }
    }
  }, {
    nodeSpec: "end",
    id: 'END-ORDER-SUCCESS'
  }, {
    nodeSpec: "notifyUser",
    id: 'NOTIFY-USER',
    next: 'END-ORDER-ERROR',
    parameters: {
      input: {
        message: "Já existe um order para este cart"
      }
    }
  }, {
    nodeSpec: "endError",
    id: "END-ORDER-ERROR"
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
      "RPC_URL": "RPC_URL",
      "POSTGREST_URL": "POSTGREST_URL"
    },
  },
};
