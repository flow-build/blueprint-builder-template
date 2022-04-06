module.exports = {
  id: "NOTIFY-USER",
  name: "NOTIFY USER",
  next: "END",
  type: "UserTask",
  lane_id: "sessionId",
  parameters: {
    input: {},
    action: "NOTIFY_USER",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: "object",
    },
  },
  example: {
    file: "",
    schema: "",
  },
};
