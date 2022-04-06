const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "payment";
const description = "process a payment";

const nodes = [
  {
    nodeSpec: "startPayment",
    id: "START",
    next: "CONFIG",
  }, {
    nodeSpec: "configPayment",
    id: "CONFIG",
    next: "GET-ORDER",
  }, {
    nodeSpec: "getOrder",
    id: "GET-ORDER",
    next: "PENDING-PAYMENT-PICK-FIRST",
  }, {
    nodeSpec: "pendingPaymentPickFirst",
    id: "PENDING-PAYMENT-PICK-FIRST",
    next: "EXECUTE-PAYMENT-TRANSACTION",
  }, {
    nodeSpec: "executePayment",
    id: "EXECUTE-PAYMENT-TRANSACTION",
    next: "HAS-TRANSACTION-SUCCEEDED",
  }, {
    nodeSpec: "hasTransactionSucceeded",
    id: "HAS-TRANSACTION-SUCCEEDED"
  }, {
    nodeSpec: "updatePayment",
    id: "PAYMENT-SUCCESS",
    next: "HAS-REMAINING-PAYMENT",
  }, {
    nodeSpec: "hasRemainingPayments",
    id: "HAS-REMAINING-PAYMENT"
  }, {
    nodeSpec: "updateOrder",
    id: "UPDATE-ORDER",
    next: "APPEND-TRACE",
  }, {
    nodeSpec: "appendTrace",
    id: "APPEND-TRACE",
    next: "START-FULFILLMENT",
  }, {
    nodeSpec: "startFulfillmentProcess",
    id: "START-FULFILLMENT",
    next: "END",
  }, {
    nodeSpec: "end"
  }, {
    nodeSpec: "isErrorFinal",
    id: "IS-ERROR-FINAL"
  }, {
    nodeSpec: "wait",
    id: "WAIT",
    next: "EXECUTE-PAYMENT-TRANSACTION",
  }, {
    nodeSpec: "updatePayment",
    id: "PAYMENT-ERROR",
    next: "HAS-SUCCESSFUL-PAYMENT",
  }, {
    nodeSpec: "hasSuccessfulPayment",
    id: "HAS-SUCCESSFUL-PAYMENT"
  }, {
    nodeSpec: "notifyUser",
    id: "NOTIFY-USER",
    next: "UPDATE-INVOICE-ERROR",
  }, {
    nodeSpec: "updateOrder",
    id: "UPDATE-INVOICE-ERROR",
    next: "END-ERROR",
    parameters: {
      input: {
        status_code: "PAYMENT_FAILED"
      }
    }
  }, {
    nodeSpec: "paymentPickFirst",
    id: "PAYMENT-PICK-FIRST",
    next: "REVERT-PAYMENT",
  }, {
    nodeSpec: "revertPayment",
    id: "REVERT-PAYMENT",
    next: "UPDATE-PAYMENT",
  }, {
    nodeSpec: "updatePayment",
    id: "UPDATE-PAYMENT",
    next: "HAS-SUCCESSFUL-PAYMENT",
  }, {
    nodeSpec: "endError"
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
