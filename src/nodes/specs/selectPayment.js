module.exports = [{
  id: "SELECT-PAYMENT",
  name: "SELECT PAYMENT",
  next: "PAYMENT-SELECTION-BAG",
  type: "UserTask",
  lane_id: "free",
  parameters: {
    input: {
      cart: { $ref: "bag.cart" },
      paymentOptions: { $ref: "bag.paymentOptions" }
    },
    action: "SELECT_PAYMENT",
    activity_manager: "commit",
    timeout: 600,
    activity_schema: {
      type: "object"
    }
  },
  example: {
    file: "",
    schema: "",
  },
},
{
  id: "PAYMENT-SELECTION-BAG",
  name: "PAYMENT SELECTION BAG",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      paymentSelection: { $ref: "result.activities[0].data" }
    },
  },
},];
