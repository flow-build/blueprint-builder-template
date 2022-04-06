module.exports = [
  {
    id: "UPDATE-PARCEL",
    name: "UPDATE PARCEL",
    next: "PARCEL-BAG",
    type: "SystemTask",
    category: "HTTP",
    lane_id: "sessionId",
    parameters: {
      input: {
        shipment_id: { $ref: "bag.shipment.id" }
      },
      request: {
        verb: "PATCH",
        url: { $mustache: 'http://{{bag.postgrest.url}}/parcels?id=eq.{{bag.parcel.id}}' },
        headers: {
          ContentType: "application/json",
          Prefer: "return=representation"
        },
      },
      valid_response_codes: [200, 201, 202],
      timeout: 600,
      max_content_length: 5000,
    },
  },
  {
    id: "PARCEL-BAG",
    name: "PARCEL BAG",
    next: "END",
    type: "SystemTask",
    category: "setToBag",
    lane_id: "sessionId",
    parameters: {
      input: {
        parcel: { $ref: "result.data" },
      },
    },
  },
];
