const { PersistedEntity } = require("./base");

class ProcessEntity extends PersistedEntity {
  static get name() {
    return "Process";
  }

  static getEntityClass() {
    return ProcessEntity;
  }

  constructor(processObj) {
    super();
    this._processObj = processObj;
  }

  async getCount(workflowId) {
    const dbData = await this.constructor
      .getPersist()
      .getCountByWorkflowId(workflowId);
    return dbData;
  }

  async getCountByStatus(workflowId) {
    const dbData = await this.constructor
      .getPersist()
      .getCountGroupedByStatus(workflowId);
    return dbData;
  }

  async getLatter(workflowId, amount = 10) {
    const dbData = await this.constructor
      .getPersist()
      .getProcessesByDate(workflowId, amount);
    return dbData;
  }
}

module.exports = {
  ProcessEntity,
};
