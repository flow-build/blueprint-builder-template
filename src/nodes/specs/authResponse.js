module.exports = {
  id: "AUTH-RESPONSE",
  name: "AUTH RESPONSE",
  type: "Flow",
  next: {
    OK: "GET-USER-BY-EXTERNAL-ID",
    default: "NOTIFY-USER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $ref: "result.data.status" }
    }
  }
}