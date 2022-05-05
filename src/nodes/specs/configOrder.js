module.exports = {
  id: "CONFIG",
  name: "CONFIG",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      cart: {
        id: { $ref: "bag.cartId" }
      },
      user: {
        id: { $ref: "bag.userId" }
      },
      actor: {
        actorId: { $ref: "actor_data.actor_id" },
        sessionId: { $ref: "actor_data.session_id" }
      }
    },
  },
};
