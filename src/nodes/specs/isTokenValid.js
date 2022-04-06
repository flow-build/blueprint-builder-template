module.exports = {
  id: "IS-TOKEN-VALID",
  name: "IS TOKEN VALID",
  type: "Flow",
  next: {
    true: "CREATE-JWT",
    default: "NOTIFY-USER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({result, bag}) => result.activities[0].data.token === bag.token" }
    }
  }
}