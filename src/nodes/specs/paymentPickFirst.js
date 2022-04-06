module.exports = {
  id: "PAYMENT-PICK-FIRST",
  name: "PAYMENT PICK FIRST",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "sessionId",
  parameters: {
    input: {
      currentPayment: {
        $js: "({bag}) => bag.payment.find(item => item.status_code === 'SUCCESS')"
      }
    },
  },
};
