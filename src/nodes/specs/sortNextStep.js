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
        $js: `({bag}) => { 
          const current = bag.shipment.status_code;
          if(current === 'READY-FOR-PICKUP') { return 'TRANSIT' }
          const random = Math.floor(Math.random() * 10) + 1;
          if(current === 'TRANSIT') {
            if(random > 3) {
              return 'DELIVERED'
            } else {
              return 'DELIVERY-FAILED'
            }
          } else {
            if(random > 3) {
              return 'TRANSIT'
            } else {
              return 'RETURNED'
            }
          }
        }`
      }
    },
  },
};
