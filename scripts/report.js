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
      const passedScenarios = report.processes.testsResult?.filter(test => test === 'PASSED').length;
      const testedScenarios = report.processes.processesEvaluated;
      const nodesCovered = report.coverage.nodes.split(" ")[0];
      const connectionsCovered = report.coverage.connections.split(" ")[0];
      if(passedScenarios < testedScenarios) {
        this.color = "red"
      } else if (nodesCovered < 100 || connectionsCovered < 100) {
        this.color = "yellow"
      } else {
        this.color = "green"
      }
      table.addRow(
        {
          "Blueprint": report.blueprint.name,
          "Tested Scenarios": testedScenarios,
          "Passed Scenarios": passedScenarios,
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