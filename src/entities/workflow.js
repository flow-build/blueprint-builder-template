const { PersistedEntity } = require("./base");

class WorkflowEntity extends PersistedEntity {
  static get name() {
    return "Workflow";
  }

  static getEntityClass() {
    return WorkflowEntity;
  }

  constructor(workflow_obj) {
    super();
    this._workflow_obj = workflow_obj;
  }

  deserialized(dbData) {
    return {
      workflow_id: dbData.id,
      created_at: dbData.created_at,
      name: dbData.name,
      version: dbData.version,
      blueprint: dbData.blueprint_spec,
    };
  }
}

module.exports = {
  WorkflowEntity,
};
