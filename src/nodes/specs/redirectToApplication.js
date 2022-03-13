module.exports = {
  id: "REDIRECT-TO-APPLICATION",
  type: "UserTask",
  name: "Redirect user to application",
  next: "FINISH-LOGIN-SUCCESS",
  lane_id: "authenticated",
  parameters: {
    action: "REDIRECT_TO",
    input: {
      route: "/app",
    },
    timeout: 10,
  },
};
