module.exports = [
  {
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
  },
  {
    id: "CONFIG",
    name: "CONFIG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "free",
    parameters: {
      input: {
        actor: {
          actorId: { $ref: "actor_data.actor_id" },
          sessionId: { $ref: "actor_data.session_id" },
        },
        user: {
          id: { $ref: "actor_data.actor_id" },
        },
        order: {
          id: { $ref: "bag.orderId"}
        }
      },
    },
  },
];
