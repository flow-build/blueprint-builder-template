const {
  WorkflowKnexPersist,
  ProcessKnexPersist,
  ProcessStateKnexPersist,
} = require("./knex");

const { PersistorSingleton } = require("./persist");

class PersistorProvider {
  static getPersistor(...args) {
    if (PersistorSingleton.instance) {
      return PersistorSingleton.instance;
    }

    const db = args[0];
    const class_map = {
      Workflow: [WorkflowKnexPersist, db],
      Process: [ProcessKnexPersist, db],
      ProcessState: [ProcessStateKnexPersist, db],
    };
    return new PersistorSingleton(class_map);
  }
}

module.exports = {
  PersistorProvider,
};
