const fs = require("fs");
const path = require("path");
const { Table } = require("console-table-printer");
const { logger } = require("../src/utils/logger");

const reportsDir = "tests/features/support/coverageReports";
const table = new Table({
  title: "Coverage Analysis",
  columns: [
    { name: "Blueprint", alignment: "left", maxLen: 12 },
    { name: "Tested Scenarios", alignment: "left", maxLen: 12 },
    { name: "Passed Scenarios", alignment: "left", maxLen: 12 },
    { name: "Nodes Covered", alignment: "left", maxLen: 12 },
    { name: "Connections Covered", alignment: "left", maxLen: 12 },
  ],
});

fs.readdir(reportsDir, async (error, files) => {
  if (error) {
    logger.error("Unable to find reports directory");
    process.exit(1);
  }

  files.forEach(async (file) => {
    if (path.extname(`../${reportsDir}/${file}`) === ".json") {
      const scriptName = path.basename(`../${reportsDir}/${file}`, ".json");
      const report = require(`../${reportsDir}/${scriptName}`);
      if (Number.parseFloat(report.coverage.nodes.split(" ")[0]) < 100 || Number.parseFloat(report.coverage.connections.split(" ")[0]) < 100) {
        if(Number.parseFloat(report.coverage.nodes.split(" ")[0]) < 100 && Number.parseFloat(report.coverage.connections.split(" ")[0]) < 100) {
          this.color = "red"
        } else {
          this.color = "yellow"
        }
      } else {
        this.color = "green"
      }
      table.addRow(
        {
          "Blueprint": report.blueprint.name,
          "Tested Scenarios": report.processes.processesEvaluated,
          "Passed Scenarios": report.processes.testsResult?.filter(test => test === 'PASSED').length,
          "Nodes Covered": report.coverage.nodes,
          "Connections Covered": report.coverage.connections,
        },
        {
          color: this.color
        }
      );
    }
  })
  
  table.printTable();
})