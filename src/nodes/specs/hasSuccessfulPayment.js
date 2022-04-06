module.exports = {
  id: "HAS-SUCCESSFUL-PAYMENT",
  name: "HAS SUCCESSFUL PAYMENT",
  type: "Flow",
  next: {
    true: "PAYMENT-SUCCESS",
    default: "IS-ERROR-FINAL"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => bag.payment.filter(item => item.status_code === 'SUCCESS').length > 0" }
    }
  }
}