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
      grok: {
        url: process.env.GROK_URL
      },
      cart: {
        id: { $ref: "bag.cartId" }
      },
      actor: {
        actorId: { $ref: "actor_data.actor_id" },
        sessionId: { $ref: "actor_data.session_id" }
      }
    },
  },
};
