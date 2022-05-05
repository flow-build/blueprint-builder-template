class KnexPersist {
  constructor(db, table) {
    this._db = db;
    this._table = table;
  }

  async get(id) {
    return await this._db(this._table).where("id", id).first();
  }
}

class WorkflowKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, "workflow");
  }
}

class ProcessKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, "process");
  }

  async getProcessesByDate(workflowId, amount = 10) {
    return await this._db(this._table)
      .select("id")
      .where("workflow_id", workflowId)
      .limit(amount)
      .orderBy("created_at", "desc");
  }

  async getCountByWorkflowId(workflowId) {
    return await this._db(this._table)
      .count("id")
      .where("workflow_id", workflowId)
      .first();
  }

  async getCountGroupedByStatus(workflowId) {
    return await this._db(this._table)
      .select({ status: "current_status" })
      .count({ processes: "id" })
      .where("workflow_id", workflowId)
      .groupBy("current_status");
  }
}

class ProcessStateKnexPersist extends KnexPersist {
  constructor(db) {
    super(db, "process_state");
  }

  async getExecution(processIds) {
    return await this._db(this._table)
      .distinct("node_id", "next_node_id")
      .whereIn("process_id", processIds);
  }
}

module.exports = {
  WorkflowKnexPersist,
  ProcessKnexPersist,
  ProcessStateKnexPersist,
};
