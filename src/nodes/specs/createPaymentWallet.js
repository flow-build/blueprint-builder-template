module.exports = {
  id: "CREATE-PAYMENT-WALLET",
  name: "CREATE PAYMENT WALLET",
  next: "END",
  type: "SystemTask",
  category: "HTTP",
  lane_id: "sessionId",
  parameters: {
    input: {
      order_id: { $ref: "bag.order.id" },
      use_wallet: true,
    },
    request: {
      verb: "POST",
      url: { $mustache: "http://{{environment.RPC_URL}}/rpc/order/pay" },
      headers: {
        ContentType: "application/json",
      },
    },
    valid_response_codes: [200, 201, 202],
    timeout: 600,
    max_content_length: 5000,
  },
};
