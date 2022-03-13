module.exports = {
  id: "LOGIN",
  name: "Store process parameters",
  next: "CHECK-LOGIN-RESPONSE",
  type: "SystemTask",
  lane_id: "anonymous",
  category: "HTTP",
  parameters: {
    input: {
      email: { $ref: "bag.email" },
      password: { $decrypt: "bag.password" },
    },
    request: {
      url: "https://myapi.com/login",
      verb: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  },
};
