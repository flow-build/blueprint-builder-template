module.exports = {
  id: "BAG-USER",
  name: "SET USER TO BAG",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      user: { $ref: "result.activities.0.data" }
    },
  },
};
  