module.exports = {
  id: "CONFIRM-VALUE",
  name: "CONFIRM_VALUE",
  next: "END",
  type: "UserTask",
  lane_id: "free",
  parameters: {
    input: {
      order: { $ref: "bag.order" }
    },
    action: "CONFIRM_VALUE",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: 'object',
      required: [ "proceed" ],
      properties: {
        proceed: { type: 'boolean' }
      }
    }
  },
  example: {
    file: "",
    schema: "",
  },
};
