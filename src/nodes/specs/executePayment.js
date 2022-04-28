module.exports = {
  id: "EXECUTE-PAYMENT",
  name: "EXECUTE PAYMENT",
  next: "END",
  type: "SystemTask",
  category: "HTTP",
  lane_id: "sessionId",
  parameters: {
    input: {
      status_code: {
        $js: `({ bag }) => {
          const random = Math.floor(Math.random() * 10) + 1;
          let status_code = "SUCCESS";
          if (random > 8) {
            status_code = "PROCESSING_FAILED";
          } else if (random > 7) {
            status_code = "REFUSED";
          }
          return status_code;
        }`,
      }
    },
    request: {
      verb: "PATCH",
      url: { $mustache: "http://{{environment.POSTGREST_URL}}/payments?id=eq.{{bag.currentPayment.id}}" },
      headers: {
        ContentType: "application/json",
        Prefer: "return=representation",
        Accept: "application/vnd.pgrst.object+json"
      },
    },
    valid_response_codes: [200, 201, 202],
    timeout: 600,
    max_content_length: 5000,
  },
};
