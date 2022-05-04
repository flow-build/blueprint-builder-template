const { ProcessStateEntity } = require("../entities/processState");
const { PersistorProvider } = require("../persist/provider");

class ProcessState {
  constructor(db) {
    this._db = db;
    PersistorProvider.getPersistor(db);
  }

  async getExecution(processIds) {
    let execution = await new ProcessStateEntity().fetchExecutionByProcessId(
      processIds
    );

    const nodes = await execution.map((state) => state.node_id);
    const connections = await execution
      .filter((item) => item.next_node_id && item.node_id !== item.next_node_id)
      .map((state) => `${state.node_id} -> ${state.next_node_id}`, {});

    return {
      nodes: [...new Set(nodes)],
      connections: [...new Set(connections)],
    };
  }
}

module.exports = {
  ProcessState,
};
