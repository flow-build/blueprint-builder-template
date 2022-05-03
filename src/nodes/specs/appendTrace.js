module.exports = [
  {
    id: "CREATE-UUID",
    name: "CREATE UUID",
    next: "APPEND-TRACE",
    type: "SystemTask",
    category: "createUuid",
    lane_id: "sessionId",
    parameters: {
      input: {
        type: "uuid",
      },
    },
  },
  {
    id: "APPEND-TRACE",
    name: "APPEND TRACE",
    next: "END",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        id: { $ref: "result.id" },
        user_id: { $ref: "bag.actor.actorId" },
        cart_id: { $ref: "bag.cart.id" },
        order_id: { $ref: "bag.order.id" },
        invoice_id: { $ref: "bag.invoice.id" },
        parcel_id: { $ref: "bag.parcel.id" },
        shipping_id: { $ref: "bag.shipping.id" },
        inventory_id: { $ref: "bag.inventory.id" },
        item_id: { $ref: "bag.item.id" },
        event: { $ref: "bag.eventType" },
        created_at: { $js: "() => new Date()"}
      },
      request: {
        verb: "POST",
        url: { $mustache: "http://{{environment.POSTGREST_URL}}/traces" },
        headers: {
          ContentType: "application/json",
          Prefer: "return=representation",
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 5000,
    },
  },
];
