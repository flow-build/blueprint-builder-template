module.exports = {
  id: "INFORM-CREDENTIALS",
  name: "INFORM CREDENTIALS",
  next: "END",
  type: "UserTask",
  lane_id: "sessionId",
  parameters: {
    input: {},
    action: "INFORM_CREDENTIALS",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: 'object',
      required: ['email', 'password' ],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      }
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
