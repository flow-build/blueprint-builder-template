module.exports = [
  {
    id: "CREATE-ORDER",
    name: "CREATE ORDER",
    next: "CREATE-ORDER-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        cart_id: { $ref: "bag.cart[0].id" },
        paymentOptions: { $ref: "bag.paymentSelection" }
      },
      request: {
        verb: "POST",
        url: { $mustache: "http://{{environment.RPC_URL}}/rpc/order/create" },
        headers: {
          ContentType: "application/json",
        },
      },
      valid_response_codes: [200, 201, 202, 422],
      timeout: 600,
      max_content_length: 5000,
    },
  },
  {
    id: "CREATE-ORDER-BAG",
    name: "ORDER BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        order: { $ref: "result.data.orders[0]" },
      },
    },
  },
];
