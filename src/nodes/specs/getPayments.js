module.exports = [
  {
    id: "GET-PAYMENTS",
    name: "GET PAYMENTS",
    next: "PAYMENTS-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: 'http://{{environment.POSTGREST_URL}}/payments?order_id=eq.{{bag.order.id}}' },
        headers: {
          ContentType: "application/json",
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 5000,
    },
  },
  {
    id: "PAYMENTS-BAG",
    name: "PAYMENTS BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        payments: { $ref: "result.data" },
      },
    },
  },
];
