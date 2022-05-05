module.exports = [
  {
    id: "UPDATE-ORDER-SUCESS",
    name: "UPDATE ORDER",
    next: "ORDER-UPDATE-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        status_code: "SUCCESS"
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{environment.POSTGREST_URL}}/orders?id=eq.{{bag.order.id}}' },
        headers: {
          ContentType: "application/json",
          Prefer: "return=representation",
          Accept: "application/vnd.pgrst.object+json"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 5000,
    },
  },
  {
    id: "ORDER-UPDATE-BAG",
    name: "ORDER UPDATE BAG",
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
