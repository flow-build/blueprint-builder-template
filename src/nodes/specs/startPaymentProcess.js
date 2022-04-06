module.exports = {
  id: "START-PAYMENT-PROCESS",
  name: "START PAYMENT PROCESS",
  next: "END",
  type: "SystemTask",
  category: "startProcess",
  lane_id: "sessionId",
  parameters: {
    workflow_name: "payment",
    actor_data: { $ref: "actor_data" },
    input: {
      orderId: { $ref: "bag.order.id" },
    },
  },
};
