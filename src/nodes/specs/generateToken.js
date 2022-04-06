module.exports = {
  id: "GENERATE-TOKEN",
  name: "GENERATE TOKEN",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "sessionId",
  parameters: {
    input: {
      token: { $js: '() => { const token = Math.floor(Math.random() * 1000000) + 1; return token.toString(); }'}
    },
  },
};
