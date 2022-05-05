const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");
const name = "fulfillment";
const description = "execute fulfillment";
const nodes = [
  {
    nodeSpec: "startFulfillment",
    id: "START",
    next: "GET-ORDER",
  }, {
    nodeSpec: "getOrder",
    id: "GET-ORDER",
    next: "CREATE-SHIPMENT",
  },
  {
    nodeSpec: "createShipment",
    id: "CREATE-SHIPMENT",
    next: "SHIPMENT-STATUS"
  },
  {
    nodeSpec: "checkShipmentStatus",
    id: "SHIPMENT-STATUS"
  }, {
    nodeSpec: "updateShipment",
    id: "UPDATE-SHIPMENT-TRANSIT",
    next: "SORT-NEXT-STEP",
  }, {
    nodeSpec: "sortNextStep",
    id: "SORT-NEXT-STEP",
    next: "WAIT",
  }, {
    nodeSpec: "wait",
    id: "WAIT",
    next: "SHIPMENT-STATUS",
  },
  {
    nodeSpec: "updateShipment",
    id: "UPDATE-SHIPMENT-DELIVERED",
    next: "UPDATE-ORDER-DELIVERED",
  },
  {
    nodeSpec: "updateOrderSuccess",
    id: "UPDATE-ORDER-DELIVERED",
    next: "END",
    parameters: {
      input: {
        status_code: "DELIVERED"
      }
    },
  },
  {
    nodeSpec: "updateShipment",
    id: "UPDATE-SHIPMENT-RETURNED",
    next: "UPDATE-ORDER-RETURNED",
    status_code: "RETURNED"
  },
  {
    nodeSpec: "updateOrderError",
    id: "UPDATE-ORDER-RETURNED",
    next: "END-ERROR",
    input: {
      status_code: "RETURNED"
    }
  },
   {
    nodeSpec: "end"
  }, {
    nodeSpec: "endError"
  }
];
module.exports = {
  name: name,
  description: description,
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes: getNodes(nodes),
    lanes: getLanes(getNodes(nodes)),
    environment: {
      RPC_URL: "RPC_URL",
      POSTGREST_URL: "POSTGREST_URL"
    },
  },
};