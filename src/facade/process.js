const { ProcessEntity } = require("../entities/process");
const { PersistorProvider } = require("../persist/provider");

class Process {
  constructor(db) {
    this._db = db;
    PersistorProvider.getPersistor(db);
  }

  async getCount(workflowId) {
    let processes = await new ProcessEntity().getCount(workflowId);

    return parseInt(processes.count);
  }

  async getCountByStatus(workflowId) {
    const processes = await new ProcessEntity().getCountByStatus(workflowId);
    const response = await processes.reduce((acc, item) => {
      acc[item.status] = parseInt(item.processes);
      return acc;
    }, {});
    return response;
  }

  async getLatter(workflowId, amount) {
    let processes = await new ProcessEntity().getLatter(workflowId, amount);

    return processes.map((item) => item.id);
  }
}

module.exports = {
  Process,
};
