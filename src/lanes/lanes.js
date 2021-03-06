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
    rule: { $js: "({ actor_data, bag }) => (actor_data.actor_id === bag.actor_id)"},
  },
  {
    id: "eventId",
    name: "restricted to eventId",
    rule: { $js: "({ actor_data, bag }) => (actor_data.event_id === bag.actor.event_id ? true : false)" },
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