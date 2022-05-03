module.exports = [
  {
    id: "GET-PROFILE",
    name: "GET PROFILE",
    next: "END",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: "http://{{environment.POSTGREST_URL}}/users?email=eq.{{result.activities[0].data.email}}" },
        headers: {
          ContentType: "application/json"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 10000,
    },
  }
];
  