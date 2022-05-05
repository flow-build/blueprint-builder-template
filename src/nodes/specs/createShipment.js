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
        op_code: "CARRIER",
        price: 20,
        status_code: "WAITING"
      },
      request: {
        verb: "POST",
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