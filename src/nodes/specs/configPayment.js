module.exports = {
  id: "CONFIG",
  name: "CONFIG",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      postgrest: {
        url: process.env.POSTGREST_URL,
      },
      order: {
        id: { $ref: "bag.orderId" }
      },
      actor: {
        actorId: { $ref: "actor_data.actor_id" },
        sessionId: { $ref: "actor_data.session_id" }
      }
    },
  },
};
