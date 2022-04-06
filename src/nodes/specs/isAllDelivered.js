module.exports = {
  id: "IS-ALL-DELIVERED",
  name: "IS ALL DELIVERED",
  type: "Flow",
  next: {
    default: "WAIT-FOR-UPDATES",
    true: "END"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $js: "({bag}) => bag.order.shipments.filter(item => ['DELIVERED','RETURNED'].includes(item.status_code)).length > 0" }
    }
  }
}