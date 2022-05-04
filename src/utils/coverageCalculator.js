require("dotenv").config();
const Knex = require("knex");
const knexConfig = require("../../knexfile")["development"];
const { Coverage } = require("../facade/coverage");
const db = Knex(knexConfig);
const fs = require('fs');

class BlueprintCoverage {
  constructor() {
    this.coverage = new Coverage(db);
  }

  async analyze(workflowName, count) {

    const workflow = await db('workflow')
      .where('name', workflowName)
      .orderBy('created_at', 'desc')
      .first();

    const result = await this.coverage.calculateCoverage(workflow.id, count);
    const now = new Date();
    const reportFileName = (workflowName + now.getFullYear() + (now.getMonth() + 1) + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds());
    
    fs.writeFileSync(`tests/features/support/coverageReports/${reportFileName}.json`, JSON.stringify(result), err => {
      if (err) throw err;
    });

    setTimeout(function () {
      process.exit();
    }, 5000);


  }

}

module.exports = { BlueprintCoverage };
