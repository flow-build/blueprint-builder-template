module.exports = {
  id: "COUNT-TEST",
  name: "Increase count",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "actorId",
  parameters: {
    input: {
      count: {
        $js: "({bag}) => (bag?.count ? bag.count + 1 : 1)"
      }
    }
  },
};