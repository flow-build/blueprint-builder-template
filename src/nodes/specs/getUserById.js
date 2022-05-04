module.exports = [
  {
    id: "GET-USER-BY-EXTERNAL-ID",
    name: "Get User By External ID",
    next: "USER-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: "http://{{environment.POSTGREST_URL}}/users?id=eq.{{bag.user.id}}" },
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
    id: "USER-BAG",
    name: "User Profile BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        user: { $ref: "result.data" },
      },
    },
  },
];
