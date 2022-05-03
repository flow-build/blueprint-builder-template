module.exports = [
  {
    id: "CREATE-USER",
    name: "CREATE USER",
    next: "END",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        email: { $ref: "bag.user.email" },
        password: { $ref: "bag.user.password" }
      },
      request: {
        verb: "POST",
        url: { $mustache: "https://{{environment.SUPERTOKENS_BASE_URL}}/recipe/signup" },
        headers: {
          ContentType: "application/json",
          "api-key": "p1A65kcqn1h=vqBL2pLBBxD2K51x1Z"
        },
      },
      valid_response_codes: [200, 201, 202, 400, 422],
      timeout: 600,
      max_content_length: 5000,
    },
  }
];
  