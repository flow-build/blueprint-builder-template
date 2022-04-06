module.exports = {
  id: "HAS-TRANSACTION-SUCCEEDED",
  name: "HAS TRANSACTION SUCCEEDED",
  type: "Flow",
  next: {
    true: "PAYMENT-SUCCESS",
    default: "IS-ERROR-FINAL"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({result}) => result.activities[0].data.status === 'SUCCESS'" }
    }
  }
}