module.exports = {
  id: "HAS-SUCCESSFUL-PAYMENT",
  name: "HAS SUCCESSFUL PAYMENT",
  type: "Flow",
  next: {
    true: "PAYMENT-PICK-FIRST",
    default: "NOTIFY-USER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => bag.payments.filter(item => item.status_code === 'SUCCESS').length > 0" }
    }
  }
}