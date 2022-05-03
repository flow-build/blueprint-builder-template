module.exports = {
  id: "HAS-PROFILE",
  name: "HAS PROFILE",
  type: "Flow",
  next: {
    true: "NOTIFY-ALREADY-EXISTS",
    default: "CREATE-USER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({result}) => result.data" }
    }
  }
}