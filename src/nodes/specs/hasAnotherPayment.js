module.exports = {
  id: "HAS-ANOTHER-PAYMENT",
  name: "HAS ANOTHER PAYMENT",
  type: "Flow",
  next: {
    true: "PAYMENT-PICK-FIRST",
    default: "START-PAYMENT"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => bag.remainingPayments.length > 0" }
    }
  }
}