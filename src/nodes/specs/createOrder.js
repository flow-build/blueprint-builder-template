module.exports = [
  {
    id: "CREATE-ORDER",
    name: "CREATE ORDER",
    next: "ORDER-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        user_id: { $ref: "bag.actor.actorId" },
        cart_id: { $ref: "bag.cart.id" }
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{bag.postgrest.url}}/orders' },
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
    id: "CREATE-ORDER-BAG",
    name: "ORDER BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        order: { $ref: "result.data" },
      },
    },
  },
];
