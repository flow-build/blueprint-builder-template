module.exports = [
  {
    id: "REVERT-PAYMENT",
    name: "REVERT PAYMENT",
    next: "END",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        status_code: "FAILED"
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{environment.POSTGREST_URL}}/payments?id=eq.{{bag.currentPayment.id}}' },
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
];
