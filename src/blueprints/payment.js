const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "payment";
const description = "process a payment";

const nodes = [
  {
    nodeSpec: "startPayment",
    id: "START",
    next: "GET-USER-BY-ID",
  },
  {
    nodeSpec: "getUserById",
    id: "GET-USER-BY-ID",
    next: "GET-ORDER",
  },
  {
    nodeSpec: "getOrder",
    id: "GET-ORDER",
    next: "GET-PAYMENTS",
  },
  {
    nodeSpec: "getPayments",
    id: "GET-PAYMENTS",
    next: "PENDING-PAYMENT-PICK-FIRST",
  },
  {
    nodeSpec: "pendingPaymentPickFirst",
    id: "PENDING-PAYMENT-PICK-FIRST",
    next: "EXECUTE-PAYMENT-TRANSACTION",
  },
  {
    nodeSpec: "executePayment",
    id: "EXECUTE-PAYMENT-TRANSACTION",
    next: "HAS-TRANSACTION-SUCCEEDED",
  },
  {
    nodeSpec: "hasTransactionSucceeded",
    id: "HAS-TRANSACTION-SUCCEEDED",
    next: {
      true: "TRACE-SUCCESS",
      default: "IS-ERROR-FINAL",
    },
  },
  {
    nodeSpec: "appendTrace",
    id: "TRACE-SUCCESS",
    next: "HAS-REMAINING-PAYMENT",
  },
  {
    nodeSpec: "hasRemainingPayments",
    id: "HAS-REMAINING-PAYMENT",
    next: {
      true: 'PENDING-PAYMENT-PICK-FIRST',
      default: 'UPDATE-ORDER-SUCCESS'
    }
  },
  {
    nodeSpec: "updateOrderSuccess",
    id: "UPDATE-ORDER-SUCCESS",
    next: "SEND-SMS-SUCCESS",
  },
  {
    nodeSpec: "sendPaymentSms",
    id: "SEND-SMS-SUCCESS",
    next: "START-FULFILLMENT",
    parameters: {
      input: {
        Body: { $js: "({bag}) => 'O pagamento do seu pedido ' + bag.order.id.substring(30) + ' foi realizado com sucesso.'" },
      }
    }
  },
  {
    nodeSpec: "startFulfillmentProcess",
    id: "START-FULFILLMENT",
    next: "END",
  },
  {
    nodeSpec: "end",
  },
  {
    nodeSpec: "isErrorFinal",
    id: "IS-ERROR-FINAL",
    next: {
      true: "TRACE-ERROR",
      default: "SEND-SMS-TEMP-ERROR",
    },
  },
  {
    nodeSpec: "appendTrace",
    id: "TRACE-ERROR",
    next: "SEND-SMS-FINAL-ERROR",
  },
  {
    nodeSpec: "sendPaymentSms",
    id: "SEND-SMS-TEMP-ERROR",
    next: "WAIT",
    parameters: {
      input: {
        Body: "Ops, tivemos um problema com seu pagamento, mas não se preocupe, tentaremos novamente.",
      }
    }
  },
  {
    nodeSpec: "sendPaymentSms",
    id: "SEND-SMS-FINAL-ERROR",
    next: "END-ERROR",
    parameters: {
      input: {
        Body: "Ops, tivemos um problema com seu pagamento, favor cadastrar outra forma de pagamento.",
      }
    }
  },
  {
    nodeSpec: "wait",
    id: "WAIT",
    next: "EXECUTE-PAYMENT-TRANSACTION",
  },
  {
    nodeSpec: "hasSuccessfulPayment",
    id: "HAS-SUCCESSFUL-PAYMENT",
    next: {
      true: "PAYMENT-PICK-FIRST",
      default: "UPDATE-ORDER-ERROR",
    },
  },
  {
    nodeSpec: "updateOrderError",
    id: "UPDATE-ORDER-ERROR",
    next: "END-ERROR",
    parameters: {
      input: {
        status_code: "PAYMENT_FAILED",
      },
    },
  },
  {
    nodeSpec: "paymentPickFirst",
    id: "PAYMENT-PICK-FIRST",
    next: "REVERT-PAYMENT",
  },
  {
    nodeSpec: "revertPayment",
    id: "REVERT-PAYMENT",
    next: "HAS-SUCCESSFUL-PAYMENT",
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
      RPC_URL: "RPC_URL",
      POSTGREST_URL: "POSTGREST_URL",
      TWILIO_ACCOUNT_ID: "TWILIO_ACCOUNT_ID",
      TWILIO_AUTH_TOKEN: "TWILIO_AUTH_TOKEN",
    },
  },
};
