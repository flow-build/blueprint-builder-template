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
        cart_id: {
          $ref: 'bag.cart.id'
        }
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{environment.POSTGREST_URL}}/users?id=eq.{{bag.userId}}' },
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
