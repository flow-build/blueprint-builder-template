module.exports = {
  id: "START-ORDER",
  name: "start order",
  type: "Start",
  next: "END",
  lane_id: "free",
  parameters: {
    input_schema: {
      type: "object",
      required: ["cartId", "userId"],
      properties: {
        cartId: { type: "string", format: "uuid" },
        userId: { type: "string", format: "uuid"}
      }
    },
    timeout: 86400
  }
};
