module.exports = [
  {
    id: "LINK-CART-TO-USER",
    name: "LINK CART TO USER",
    next: "LINK-CART-TO-USER-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        user_id: {
          $ref: 'bag.userId'
        }
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{environment.POSTGREST_URL}}/carts?id=eq.{{bag.cart.0.id}}' },
        headers: {
          ContentType: "application/json",
          Prefer: "return=representation",
          Accept: "application/vnd.pgrst.object+json"
        },
      },
      valid_response_codes: [200, 201, 202, 204],
      timeout: 600,
      max_content_length: 5000,
    },
  },
  {
    id: "LINK-CART-TO-USER-BAG",
    name: "LINK CART TO USER BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        linkedCart: { $ref: "result.data" },
      },
    },
  },
];
