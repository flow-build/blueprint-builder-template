module.exports = [
  {
    id: "GET-INVOICE",
    name: "GET INVOICE",
    next: "INVOICE-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {},
      request: {
        verb: "GET",
        url: { $mustache: "http://{{bag.postgrest.url}}/invoices?id=eq.{{bag.invoice.id}}" },
        headers: {
          ContentType: "application/json",
          Accept: "application/vnd.pgrst.object+json"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 10000,
    },
  },
  {
    id: "INVOICE-BAG",
    name: "INVOICE BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        invoice: { $ref: "result.data" },
        order: {
          id: { $ref: "result.data.order_id" }
        },
        parcel: {
          id: { $ref: "result.data.parcel_id" }
        }
      },
    },
  },
];
