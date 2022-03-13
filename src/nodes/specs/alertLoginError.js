module.exports = {
  id: "ALERT-LOGIN-ERROR",
  type: "UserTask",
  name: "Alerts user the login failed",
  next: "FINISH-LOGIN-ERROR",
  lane_id: "anonymous",
  parameters: {
    action: "SHOW_ALERT",
    input: {
      message: {
        $mustache: "There was an error with the login! {{result.message}}",
      },
    },
    timeout: 10,
  },
};
