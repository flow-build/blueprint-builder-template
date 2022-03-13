const lisp = require("./lispRules");

const lanes = [
  {
    id: "anonymous",
    name: "someone without claims",
    rule: lisp.validate_claim("anonymous"),
  },
  {
    id: "authenticated",
    name: "checks if actor data has claim authenticated",
    rule: lisp.validate_claim("authenticated"),
  }
];

const getLanes = (nodes) => {
  const usedLanes = nodes.map((node) => node.lane_id);
  const uniqueLanes = [...new Set(usedLanes)];

  return lanes.filter((lane) => uniqueLanes.includes(lane.id));
};

module.exports = {
  lanes,
  getLanes,
};