module.exports = {
  id: "DELIVER-JWT",
  name: "DELIVER_JWT",
  next: "END",
  type: "UserTask",
  lane_id: "sessionId",
  parameters: {
    input: {
      token: { $ref: 'result.data.jwtToken' }
    },
    action: "DELIVER_JWT",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: "object"
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
