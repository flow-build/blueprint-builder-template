module.exports = [
  {
    id: "SELECT-PAYMENT",
    name: "SELECT PAYMENT",
    next: "PAYMENT-SELECTION-BAG",
    type: "UserTask",
    lane_id: "sessionId",
    parameters: {
      input: {
        cart: { $ref: "bag.cart" },
        paymentOptions: { $ref: "bag.paymentOptions" },
      },
      action: "SELECT_PAYMENT",
      activity_manager: "commit",
      timeout: 1200,
      activity_schema: {
        type: "object",
        required: ["payments"],
        properties: {
          useWallet: { type: "boolean" },
          payments: {
            type: "array",
            minItems: 1,
            items: [
              {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string", format: "uuid" },
                },
              },
            ],
          },
        },
      },
    },
    example: {
      file: "",
      schema: "",
    },
  },
  {
    id: "PAYMENT-SELECTION-BAG",
    name: "PAYMENT SELECTION BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        paymentSelection: { $ref: "result.activities[0].data.payments" },
        useWallet: { $ref: "result.activities[0].data.useWallet" },
      },
    },
  },
];