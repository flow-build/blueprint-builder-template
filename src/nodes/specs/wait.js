module.exports = {
  id: "WAIT",
  name: "WAIT",
  next: "END",
  type: "SystemTask",
  category: "timer",
  lane_id: "sessionId",
  parameters: {
    input: {},
    timeout: 60
  }
}