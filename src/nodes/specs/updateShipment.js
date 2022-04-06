module.exports = [
  {
    id: "UPDATE-SHIPMENT",
    name: "UPDATE SHIPMENT",
    next: "SHIPMENT-UPDATE-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        status_code : { $ref: "bag.nextStatusCode" }
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{bag.postgrest.url}}/shipments?id=eq.{{bag.shipment.id}}' },
        headers: {
          ContentType: "application/json",
          Prefer: "return=representation"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 5000,
    },
  },
  {
    id: "SHIPMENT-UPDATE-BAG",
    name: "SHIPMENT UPDATE BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        shipment: { $ref: "result.data" },
      },
    },
  },
];
