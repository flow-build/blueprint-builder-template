module.exports = {
  id: "CREATE-JWT",
  name: "CREATE JWT",
  next: "END",
  type: "SystemTask",
  category: "tokenize",
  lane_id: "sessionId",
  parameters: {
    input: {
      actor_id: { $ref: "bag.user.id" },
      claims: ["user"]
    }
  }
}