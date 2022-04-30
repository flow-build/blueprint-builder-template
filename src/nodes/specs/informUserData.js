module.exports = {
  id: "INFORM-USER-DATA",
  name: "INFORM USER DATA",
  next: "END",
  type: "UserTask",
  lane_id: "sessionId",
  parameters: {
    input: {},
    action: "INFORM_USER_DATA",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: 'object',
      required: ['phone', 'email', 'name', 'password'],
      properties: {
        phone: { type: 'string' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        password: { type: 'string' }
      }
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
  