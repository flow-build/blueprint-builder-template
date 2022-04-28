module.exports = {
  id: "HAS-REMAINING-PAYMENT",
  name: "HAS REMAINING PAYMENT",
  type: "Flow",
  next: {
    true: "PENDING-PAYMENT-PICK-FIRST",
    default: "UPDATE-ORDER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => bag.remainingPayments?.length > 0" }
    }
  }
}