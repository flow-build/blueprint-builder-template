const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "fulfillment";
const description = "execute fulfillment";

const nodes = [
  {
    nodeSpec: "startFulfillment",
    id: "START",
    next: "GET-INVOICE",
  }, {
    nodeSpec: "getInvoice",
    id: "GET-INVOICE",
    next: "CREATE-SHIPMENT",
  }, {
    nodeSpec: "createShipment",
    id: "CREATE-SHIPMENT",
    next: "UPDATE-PARCEL",
  }, {
    nodeSpec: "updateParcel",
    id: "UPDATE-PARCEL",
    next: "SHIPMENT-STATUS",
  }, {
    nodeSpec: "checkShipmentStatus",
    id: "SHIPMENT-STATUS"
  }, {
    nodeSpec: "updateShipment",
    id: "UPDATE-SHIPMENT",
    next: "APPEND-TRACE",
  }, {
    nodeSpec: "appendTrace",
    id: "APPEND-TRACE",
    next: "SORT-NEXT-STEP",
    parameters: {
      input: {
        event: "update shipping status"
      }
    }
  }, {
    nodeSpec: "sortNextStep",
    id: "SORT-NEXT-STEP",
    next: "WAIT",
  }, {
    nodeSpec: "wait",
    id: "WAIT",
    next: "SHIPMENT-STATUS",
  }, {
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
    environment: {},
  },
};
