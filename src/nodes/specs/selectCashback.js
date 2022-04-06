module.exports = {
  id: "SELECT-CASHBACK",
  name: "SELECT_CASHBACK",
  next: "END",
  type: "UserTask",
  lane_id: "free",
  parameters: {
    input: {
      orderValue: { $ref: "bag.value"}
    },
    action: "SELECT_CASHBACK",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: "object",
      required: ["use"],
      properties: {
        value: { type: "integer" },
        use: { type: "boolean" }
      }
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
