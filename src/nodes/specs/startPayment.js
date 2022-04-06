module.exports = {
  id: "START-PAYMENT",
  name: "START",
  type: "Start",
  next: "END",
  lane_id: "free",
  parameters: {
    input_schema: {
      type: "object",
      required: ["orderId"],
      properties: {
        orderId: { type: "string", format: "uuid" },
      },
    },
  },
};
