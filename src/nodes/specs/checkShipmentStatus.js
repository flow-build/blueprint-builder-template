module.exports = {
  id: "CHECK-SHIPMENT-STATUS",
  name: "CHECK SHIPMENT STATUS",
  type: "Flow",
  next: {
    DELIVERED: "UPDATE-SHIPMENT-DELIVERED",
    RETURNED: "UPDATE-SHIPMENT-RETURNED",
    TRANSIT:  "UPDATE-SHIPMENT-TRANSIT",
    default: "UPDATE-SHIPMENT-TRANSIT"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $ref: "bag.shipment[0].status_code" }
    }
  }
}