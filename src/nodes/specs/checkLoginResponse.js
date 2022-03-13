module.exports = {
  id: "LOGIN-RESPONSE",
  name: "The login was successful?",
  next: {
    default: "ALERT-LOGIN-ERROR",
    200: "REDIRECT-TO-APPLICATION",
    401: "ALERT-LOGIN-ERROR",
  },
  type: "Flow",
  lane_id: "anonymous",
  parameters: {
    input: {
      decision: {
        $ref: "result.response_code",
      },
    },
  },
};
