const { PersistedEntity } = require("./base");

class ProcessStateEntity extends PersistedEntity {
  static get name() {
    return "ProcessState";
  }

  static getEntityClass() {
    return ProcessStateEntity;
  }

  constructor(processStateObj) {
    super();
    this._processStateObj = processStateObj;
  }

  async fetchExecutionByProcessId(processId) {
    const dbData = await this.constructor.getPersist().getExecution(processId);
    return dbData;
  }
}

module.exports = {
  ProcessStateEntity,
};
