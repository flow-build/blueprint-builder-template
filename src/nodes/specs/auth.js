module.exports = [
  {
    id: "AUTH",
    name: "AUTH",
    next: "AUTH-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        email: { $ref: "result.activities[0].data.email" },
        password: { $ref: "result.activities[0].data.password" },
      },
      request: {
        verb: "POST",
        url: {
          $mustache: "https://{{bag.supertokens.url}}/recipe/signin",
        },
        headers: {
          ContentType: "application/json",
          rid: "emailpassword",
          "cdi-version": "2.9",
          "api-key": { $ref: "bag.supertokens.apiKey" },
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 2000,
    },
  },
  {
    id: "AUTH-BAG",
    name: "AUTH-BAG",
    next: "GET-USER-BY-ID",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        user: { $ref: "result.data.user" },
      },
    },
  },
];
