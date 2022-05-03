module.exports = {
  id: "IS-ERROR-FINAL",
  name: "IS ERROR FINAL",
  type: "Flow",
  next: {
    true: "PAYMENT-ERROR",
    default: "WAIT"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => !bag.transaction.retry" }
    }
  }
}