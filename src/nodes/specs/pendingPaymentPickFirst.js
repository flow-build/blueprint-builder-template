module.exports = {
  id: "PENDING-PAYMENT-PICK-FIRST",
  name: "PENDING PAYMENT PICK FIRST",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "sessionId",
  parameters: {
    input: {
      remainingPayments: {
        $js: '({bag}) => bag.payments.slice(1)'
      },
      currentPayment: {
        $ref: 'bag.payments[0]'
      }
    },
  },
};