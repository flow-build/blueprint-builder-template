module.exports = {
  id: "EXECUTE-PAYMENT",
  name: "EXECUTE PAYMENT",
  next: "END",
  type: "SystemTask",
  category: "HTTP",
  lane_id: "sessionId",
  parameters: {
    input: {
      $js: `({ bag }) => {
        const currentPayment = bag.currentPayment;
        const random = Math.floor(Math.random() * 10) + 1;
        currentPayment.status = "FAILED";
        if (random > 4) {
          currentPayment.status_code = "SUCCESS";
        } else if (random > 2) {
          currentPayment.external_status = "FINAL";
        }
        return currentPayment;
      }`,
    },
    request: {
      verb: "POST",
      url: { $mustache: "http://{{bag.postgrest.url}}/payments" },
      headers: {
        ContentType: "application/json",
        Prefer: "return=representation",
      },
    },
    valid_response_codes: [200, 201, 202],
    timeout: 600,
    max_content_length: 5000,
  },
};
