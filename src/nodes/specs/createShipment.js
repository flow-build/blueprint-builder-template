module.exports = [
  {
    id: "CREATE-SHIPMENT",
    name: "CREATE SHIPMENT",
    next: "SHIPMENT-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        opcode: "CARRIER",
        status_code: "WAITING"
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{bag.postgrest.url}}/shipments' },
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
    id: "SHIPMENT-BAG",
    name: "SHIPMENT BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        shipment: { $ref: "result.data" },
        nextStatusCode: "READY-FOR-PICKUP"
      },
    },
  },
];
