const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;

Given("the default user is logged in", { timeout: 60 * 1000 }, async function () {
  await this.getToken();
  return;
});

Given("que o usuario padrao esta logado", { timeout: 60 * 1000 }, async function () {
  await this.getToken();
  return;
});

Given("an anonymous user is logged in", { timeout: 60 * 1000 }, async function () {
  await this.getAnonymousToken();
  return;
});

Given("que um usuario anonimo esta logado", { timeout: 60 * 1000 }, async function () {
  await this.getAnonymousToken();
  return;
});

Given(
  "a {string} process started with the initial data of {string}",
  { timeout: 60 * 1000 },
  async function (workflowName, initialBag) {
    await this.startProcess(workflowName, initialBag);
    return;
  }
);

Given(
  "que um processo de {string} foi iniciado com os dados iniciais {string}",
  { timeout: 60 * 1000 },
  async function (workflowName, initialBag) {
    await this.startProcess(workflowName, initialBag);
    return;
  }
);

When("the user submits {string}", { timeout: 60 * 1000 }, async function (payload) {
  await this.submitActivity(payload);
  return;
});

When("o usuário submete {string}", { timeout: 60 * 1000 }, async function (payload) {
  await this.submitActivity(payload);
  return;
});

Then("the process waits at {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  assert.equal(this.currentStatus, "waiting");
  assert.equal(this.nodeId, node);
  return;
});

Then("o processo para no nó {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  assert.equal(this.currentStatus, "waiting");
  assert.equal(this.nodeId, node);
  return;
});

Then("the process finishes at {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  assert.equal(this.currentStatus, "finished");
  assert.equal(this.nodeId, node);
  return;
});

Then("o processo finaliza no nó {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  assert.equal(this.currentStatus, "finished");
  assert.equal(this.nodeId, node);
  return;
});
