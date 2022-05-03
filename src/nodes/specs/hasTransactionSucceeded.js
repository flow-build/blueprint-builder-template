module.exports = {
  id: "HAS-TRANSACTION-SUCCEEDED",
  name: "HAS TRANSACTION SUCCEEDED",
  type: "Flow",
  next: {
    true: "HAS-REMAINING-PAYMENT",
    default: "IS-ERROR-FINAL"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => bag.transaction.status === 'SUCCESS'" }
    }
  }
}