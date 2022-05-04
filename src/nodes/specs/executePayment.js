module.exports = [{
  id: "EXECUTE-PAYMENT",
  name: "EXECUTE PAYMENT",
  next: "EXECUTE-PAYMENT-BAG",
  type: "SystemTask",
  category: "HTTP",
  lane_id: "sessionId",
  parameters: {
    input: {},
    request: {
      verb: "POST",
      url: { $mustache: "http://{{environment.RPC_URL}}/rpc/payment/{{bag.currentPayment.id}}" },
      headers: {
        ContentType: "application/json"
      },
    },
    valid_response_codes: [200, 404, 422],
    timeout: 600,
    max_content_length: 5000,
  },
}, {
  id: "EXECUTE-PAYMENT-BAG",
  name: "BAG PAYMENT RESPONSE",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "sessionId",
  parameters: {
    input: {
      transaction: { $ref: "result.data" },
      eventType: { $ref: "result.data.message" }
    },
  },
}];
