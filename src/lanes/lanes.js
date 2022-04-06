const lanes = [
  {
    id: "free",
    name: "always true",
    rule: { $js: "() => true" },
  },
  {
    id: "tokenId",
    name: "restricted to tokenId",
    rule: { $js: "({ bag, actor_data }) => (actor_data.tokenId === bag.tokenId ? true : false)" },
  },
  {
    id: "actorId",
    name: "restricted",
    rule: [
      "fn",
      ["actor_data", "bag"],
      [
        "=",
        ["get", ["get", "bag", ["`", "is_authorized"]], ["`", "actor_id"]],
        ["get", "actor_data", ["`", "actor_id"]],
      ],
    ],
  },
  {
    id: "sessionId",
    name: "restricted to sessionId",
    rule: { $js: "({ actor_data, bag }) => (actor_data.session_id === bag.actor.sessionId ? true : false)" },
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