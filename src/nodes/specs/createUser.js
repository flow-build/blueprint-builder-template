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
        supertokens: { $ref: "bag.supertokens" },
        email: { $ref: "bag.email" },
        password: { $ref: "bag.password" }
      },
      request: {
        verb: "POST",
        url: { $mustache: "http://{{environment.RPC_URL}}/rpc/user/create" },
        headers: {
          ContentType: "application/json",
        },
      },
      valid_response_codes: [200, 201, 202, 422],
      timeout: 600,
      max_content_length: 5000,
    },
  }
];
  