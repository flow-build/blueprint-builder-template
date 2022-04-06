module.exports = {
  id: "NOTIFY-TEST",
  name: "NOTIFY",
  next: "END-TEST",
  type: "UserTask",
  lane_id: "actorId",
  parameters: {
    input: {},
    action: "NOTIFY_USER",
    activity_manager: "commit",
    timeout: 30,
    activity_schema: {
      type: "object",
      additionalProperties: false
    },
  },
  example: {
    file: "",
    schema: "",
  },
};