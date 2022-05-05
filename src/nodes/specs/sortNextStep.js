module.exports = {
  id: "SHIPMENT-NEXT-STEP",
  name: "SHIPMENT NEXT STEP",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "sessionId",
  parameters: {
    input: {
      nextStatusCode: {
        $js: `({bag}) => {function getNextStep(){var randon = Math.floor(Math.random() * 100);if(randon == 0){return ('RETURNED');}else if(randon < 40){return 'DELIVERED';}else if(randon < 101){return 'TRANSIT';}}; return getNextStep();}`
      }
    },
  },
};