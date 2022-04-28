module.exports = [
  {
    id: "GET-ORDER",
    name: "GET ORDER",
    next: "ORDER-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: "http://{{environment.POSTGREST_URL}}/orders?id=eq.{{bag.order.id}}" },
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
    id: "ORDER-BAG",
    name: "ORDER BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        order: { $ref: "result.data" }
      },
    },
  },
];
