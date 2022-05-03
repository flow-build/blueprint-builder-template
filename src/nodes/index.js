const _ = require("lodash");
const { logger } = require("../utils/logger");
const { getNode } = require("../utils/nodeFunctions");

const getNodes = (nodes) => {
  const NodeBP = nodes.map((bpNode) => {
    let baseSpec = getNode(bpNode.nodeSpec);
    let result;
    if (baseSpec) {
      if (_.isPlainObject(baseSpec)) {
        return _.merge(result, baseSpec, bpNode);
      } else {
        //if nodeSpec is an array, bpNode should only change ids
        result = baseSpec.map((item, idx) => {
          let node_id = `${bpNode.id}_${idx}` || item.id;
          let next = `${bpNode.id}_${idx+1}` || item.next;
          let parameters = item.parameters;
          if (idx === 0 && bpNode.id) {
            node_id = bpNode.id,
            parameters = _.merge(item.parameters, bpNode.parameters);
          }
          if (idx === baseSpec.length - 1) {
            next = bpNode.next;
          }
          return {
            id: node_id,
            name: item.name,
            next: next,
            lane_id: item.lane_id,
            type: item.type,
            category: item.category,
            parameters: parameters,
          };
        });
      }
    } else {
      logger.error(`Node [${bpNode.nodeSpec}] not found @ [${bpNode.id}]`);
      result = {};
    }
    delete result.nodeSpec;
    return result;
  });

  return NodeBP.flatMap((i) => i);
};

module.exports = {
  getNodes,
};
