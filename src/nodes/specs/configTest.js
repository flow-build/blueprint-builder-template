module.exports = {
  id: "CONFIG-TEST",
  name: "CONFIG",
  next: "END-TEST",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      actor_id: { 
        $ref: "actor_data.actor_id" 
      },
    },
  },
};