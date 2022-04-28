module.exports = {
  id: "START-FULFILLMENT",
  name: "START FULFILLMENT",
  next: "END",
  type: "SystemTask",
  category: "startProcess",
  lane_id: "sessionId",
  parameters: {
    workflow_name: "fulfillment",
    actor_data: { $ref: "actor_data" },
    input: {
      invoiceId: { $ref: "bag.order.invoice_id" }
    }
  }
}