module.exports = [
  {
    id: "GET-CART",
    name: "GET CART",
    next: "CART-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: "http://{{bag.postgrest.url}}/carts?id=eq.{{bag.cartId}}" },
        headers: {
          ContentType: "application/json",
          Accept: "application/vnd.pgrst.object+json"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 10000,
    },
  },
  {
    id: "CART-BAG",
    name: "CART BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "free",
    parameters: {
      input: {
        cart: { $ref: "result.data" },
      },
    },
  },
];
