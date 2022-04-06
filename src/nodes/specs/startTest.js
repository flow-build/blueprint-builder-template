module.exports = {
  id: "START-TEST",
  name: "START",
  type: "Start",
  next: "CONFIG-TEST",
  lane_id: "free",
  parameters: {
    input_schema: {
      type: "object",
      additionalProperties: false
    },
  },
}