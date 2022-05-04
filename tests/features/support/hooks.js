const { AfterAll, After } = require("@cucumber/cucumber");
const { BlueprintCoverage } = require("../../../src/utils/coverageCalculator");
const coverage = new BlueprintCoverage();
let count = 0;
let workflowName;
After( function (result) {
  workflowName = result.gherkinDocument.feature.name;
  count += 1;
});

AfterAll( async function () {
  await coverage.analyze(workflowName, count);
  return;
});