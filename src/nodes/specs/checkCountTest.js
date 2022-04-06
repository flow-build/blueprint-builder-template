module.exports = {
  id: "CHECK-COUNT-TEST",
  name: "Check if count is 3",
  lane_id: "actorId",
  type: "Flow",
  next: {
    3: "END-TEST",
    default: "COUNT-TEST"
  },
  parameters: {
    input: {
      key: {
        $ref: "bag.count"
      }
    }
  },
};