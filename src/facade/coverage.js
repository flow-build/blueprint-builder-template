const { PersistorProvider } = require("../persist/provider");
const { Process } = require("./process");
const { ProcessState } = require("./processState");
const { Workflow } = require("./workflow");

class Coverage {
  constructor(db) {
    this._db = db;
    PersistorProvider.getPersistor(db);
  }

  async calculateCoverage(workflowId, processCount = 20) {
    const wf = new Workflow();
    const blueprint = await wf.getNodesAndConections(workflowId);
    //console.log("bp info:", blueprint);

    const p = new Process();
    const pids = await p.getLatter(workflowId, processCount);
    //console.log("processes info:", pids);

    const ps = new ProcessState();
    //const promises = pids.map((pid) => ps.getExecution(pid));

    //const execution = await Promise.all(promises);
    const execution = await ps.getExecution(pids);
    //console.log("execution:", execution);

    const nodesUncovered = await blueprint.nodes.filter(
      (node) => !execution.nodes.includes(node)
    );
    const connectionsUncovered = await blueprint.connections.filter(
      (conn) => !execution.connections.includes(conn)
    );

    const result = {
      blueprint: {
        name: blueprint.name,
        id: blueprint.id
      },
      processes: {
        processesEvaluated: processCount,
        processIds: pids
      },
      coverage: {
        nodes: (100 * (1 - nodesUncovered.length / blueprint.nodes.length)).toPrecision(4) + ' %',
        connections:
            (100 *
            (1 - connectionsUncovered.length / blueprint.connections.length)).toPrecision(4) + ' %',
      },
      analysis: {
        uncoveredNodes: [...new Set(nodesUncovered)],
        uncoveredConnections: [...new Set(connectionsUncovered)]
      }
    };

    return result;
  }
}

module.exports = {
  Coverage,
};
