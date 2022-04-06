module.exports = {
  id: "WAIT-FOR-UPDATES",
  name: "WAIT FOR UPDATES",
  next: "END",
  type: "UserTask",
  lane_id: "sessionId",
  parameters: {
    input: {},
    action: "WAIT_FOR_UPDATES",
    activity_manager: "commit",
    timeout: 86400,
    activity_schema: {
      type: "object"
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
