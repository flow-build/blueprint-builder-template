module.exports = {
  id: "APPEND-TRACE",
  name: "APPEND TRACE",
  next: "END",
  type: "SystemTask",
  category: "HTTP",
  lane_id: "sessionId",
  parameters: {
    input: {
      id: {
        $js: `() => {
          var dt = new Date().getTime();
          var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
          });
          return uuid;
        }`,
      },
      user_id: { $ref: "bag.actor.actorId" },
      cart_id: { $ref: "bag.cart.id" },
      order_id: { $ref: "bag.order.id" },
      invoice_id: { $ref: "bag.invoice.id" },
      parcel_id: { $ref: "bag.parcel.id" },
      shipping_id: { $ref: "bag.shipping.id" },
      inventory_id: { $ref: "bag.inventory.id" },
      item_id: { $ref: "bag.item.id" },
      event: { $ref: "bag.eventType" },
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
};
