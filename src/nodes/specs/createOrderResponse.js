module.exports = {
  id: "CREATE-ORDER-RESPONSE",
  name: "ORDER RESPONSE",
  type: "Flow",
  next: {
    422: "NOTIFY-USER",
    default: "HAS-SELECTED-WALLET"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $ref: "result.status" }
    }
  }
}