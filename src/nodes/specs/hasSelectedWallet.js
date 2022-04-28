module.exports = {
  id: "HAS-ANOTHER-PAYMENT",
  name: "HAS ANOTHER PAYMENT",
  type: "Flow",
  next: {
    true: "CREATE-PAYMENT-WALLET",
    default: "CREATE-PAYMENT",
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: {
        $js: `({ bag }) => {
          const selection = bag.paymentSelection;
          const wallet = bag.paymentOptions.filter(
            (item) => item.alias === "CASHBACK_WALLET" && selection.includes(item.id)
          );
          return wallet.length > 0;
        }`,
      },
    },
  },
};
