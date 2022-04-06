module.exports = {
  id: "CONFIRM-TOKEN",
  name: "CONFIRM TOKEN",
  next: "END",
  type: "UserTask",
  lane_id: "sessionId",
  parameters: {
    input: {
      message: "Enviamos um código o celular cadastrado"
    },
    action: "CONFIRM_TOKEN",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: 'object',
      properties: {
        token: { type: 'string' }
      }
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
