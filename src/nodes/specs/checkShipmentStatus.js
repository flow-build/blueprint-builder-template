module.exports = {
  id: "CHECK-SHIPMENT-STATUS",
  name: "CHECK SHIPMENT STATUS",
  type: "Flow",
  next: {
    DELIVERED: "END",
    RETURNED: "END-ERROR",
    default: "UPDATE-SHIPMENT"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $ref: "bag.shipment.status_code" }
    }
  }
}