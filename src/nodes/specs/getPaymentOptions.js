module.exports = [
  {
    id: "GET-PAYMENT-OPTIONS",
    name: "GET PAYMENT OPTIONS",
    next: "PAYMENT-OPTIONS-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: 'http://{{environment.POSTGREST_URL}}/payment_options?user_id=eq.{{bag.cart.user_id}}' },
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
    id: "PAYMENT-OPTIONS-BAG",
    name: "PAYMENT OPTIONS BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        paymentOptions: { $ref: "result.data" },
      },
    },
  },
];
