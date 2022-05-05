const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "order";
const description = "create an order";

const nodes = [
  {
    nodeSpec: "startOrder",
    id: "START",
    next: "CONFIG",
  },
  {
    nodeSpec: "configOrder",
    id: "CONFIG",
    next: "GET-CART",
  },
  {
    nodeSpec: "getCart",
    id: "GET-CART",
    next: "LINK-CART-TO-USER",
  },
  {
    nodeSpec: "linkCartToUser",
    id: "LINK-CART-TO-USER",
    next: "GET-PAYMENT-OPTIONS",
  },
  {
    nodeSpec: "getPaymentOptions",
    id: "GET-PAYMENT-OPTIONS",
    next: "SELECT-PAYMENT",
  },
  {
    nodeSpec: "selectPayment",
    id: "SELECT-PAYMENT",
    next: "CREATE-ORDER",
  },
  {
    nodeSpec: "createOrder",
    id: "CREATE-ORDER",
    next: "CREATE-ORDER-RESPONSE",
  },
  {
    nodeSpec: "createOrderResponse",
    id: "CREATE-ORDER-RESPONSE",
    next: {
      422: "NOTIFY-USER",
      default: "GET-USER-BY-ID",
    },
  },
  {
    nodeSpec: "getUserById",
    id: "GET-USER-BY-ID",
    next: "SEND-SMS",
  },
  {
    nodeSpec: "sendSms",
    id: "SEND-SMS",
    next: "WAIT",
    parameters: {
      input: {
        Body: { $js: "({bag}) => 'Olá, recebemos seu pedido ' + bag.order.id.substring(30) + '.'" },
      },
    },
  },
  {
    nodeSpec: "wait",
    id: "WAIT",
    next: "START-PAYMENT",
    parameters: {
      input: {
        timeout: 15,
      },
    },
  },
  {
    nodeSpec: "appendTrace",
    id: "APPEND-TRACE-ORDER",
    name: "APPEND-TRACE-ORDER",
    next: "START-PAYMENT",
    parameters: {
      input: {
        event: "Order Created",
      },
    },
  },
  {
    nodeSpec: "startPaymentProcess",
    id: "START-PAYMENT",
    next: "END-ORDER-SUCCESS",
  },
  {
    nodeSpec: "appendTrace",
    id: "APPEND-TRACE-PAYMENT",
    name: "APPEND-TRACE-PAYMENT",
    next: "END-ORDER-SUCCESS",
    parameters: {
      input: {
        event: "Order sent to payment",
      },
    },
  },
  {
    nodeSpec: "end",
    id: "END-ORDER-SUCCESS",
  },
  {
    nodeSpec: "notifyUser",
    id: "NOTIFY-USER",
    next: "END-ORDER-ERROR",
    parameters: {
      input: {
        message: "Já existe um order para este cart",
      },
    },
  },
  {
    nodeSpec: "endError",
    id: "END-ORDER-ERROR",
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
      RPC_URL: "RPC_URL",
      POSTGREST_URL: "POSTGREST_URL",
      TWILIO_ACCOUNT_ID: "TWILIO_ACCOUNT_ID",
      TWILIO_AUTH_TOKEN: "TWILIO_AUTH_TOKEN",
    },
  },
};
