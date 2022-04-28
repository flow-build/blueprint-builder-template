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
        id: {
          $js: "({bag}) => bag.paymentSelection[0]"
        },
        type: {
          $js: `({bag}) => {
            const id = bag.paymentSelection[0];
            const options = bag.paymentOptions;
            return options.find(item => item.id === id).alias
          }`
        }
      },
      remainingPayments: {
        $js: "({bag}) => bag.paymentSelection.slice(1)"
      }
    },
  },
};
