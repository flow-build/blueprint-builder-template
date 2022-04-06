module.exports = {
  id: "UPDATE-PAYMENT",
  name: "UPDATE PAYMENT",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "sessionId",
  parameters: {
    input: {
      payments: {
        $js: `({ bag, result }) =>
          bag.payments.map((item) => {
            if (item.id === currentPayment.id) {
              item = result.data;
            }
            return item;
          })`,
      },
    },
  },
};
