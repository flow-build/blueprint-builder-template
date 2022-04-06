module.exports = {
  id: "AUTH-RESPONSE",
  name: "AUTH RESPONSE",
  type: "Flow",
  next: {
    OK: "GENERATE-TOKEN",
    default: "NOTIFY-USER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $ref: "result.data.status" }
    }
  }
}