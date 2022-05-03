module.exports = [
  {
    id: "CREATE-PROFILE",
    name: "CREATE PROFILE",
    next: "END",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        id: {
          $js: `() => {
            var dt = new Date().getTime();
            var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
              var r = (dt + Math.random() * 16) % 16 | 0;
              dt = Math.floor(dt / 16);
              return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
            });
            return uuid;
          }`,
        },
        email: { $ref: "bag.user.email" },
        phone: { $ref: "bag.user.password" },
        name: { $ref: "bag.user.name" },
        external_id: { $ref: "result.data.user.id"}
      },
      request: {
        verb: "POST",
        url: { $mustache: "http://{{environment.POSTGREST_URL}}/users" },
        headers: {
          ContentType: "application/json",
          Accept: "application/vnd.pgrst.object+json"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 10000,
    },
  }
];
