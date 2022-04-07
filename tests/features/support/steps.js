const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const actualTimeout = setTimeout;
const _ = require('lodash');
const mustache = require('mustache')

function wait(ms = 5000) {
  return new Promise((resolve) => {
    actualTimeout(resolve, ms);
  });
}

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

Then("the process passes through {string}", { timeout: 60 * 1000 }, async function (node) {
  await wait(500);
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  assert.equal(nodeState.node_id, node);
  assert.equal(nodeState.status, "running");
  return;
});

Then("o processo passa pelo nó {string}", { timeout: 60 * 1000 }, async function (node) {
  await wait(500);
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  assert.equal(nodeState.node_id, node);
  assert.equal(nodeState.status, "running");
  return;
});

Then("the bag of {string} has the property {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  const bagHasProperty = Object.keys(nodeState.bag).includes(property);
  assert.equal(bagHasProperty, true);
  return;
});

Then("a bag do nó {string} contém a propriedade {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  const bagHasProperty = Object.keys(nodeState.bag).includes(property);
  assert.equal(bagHasProperty, true);
  return;
});

Then("in the bag of {string} the property {string} is equal to {string}", { timeout: 60 * 1000 }, async function (node, property, value) {
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  const bagProperty = nodeState.bag[`${property}`]
  assert.equal(bagProperty, value);
  return;
});

Then("na bag do nó {string} a propriedade {string} é igual a {string}", { timeout: 60 * 1000 }, async function (node, property, value) {
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  if(typeof nodeState.bag[`${property}`] != 'object') {
    if(value.includes('{{')) {
      const bagValue = nodeState.bag[`${property}`].toString();
      const resultValue = mustache.render(value, nodeState.bag).toString();
      assert.equal(bagValue, resultValue);
      return;
    }
    const bagValue = nodeState.bag[`${property}`].toString();
    assert.equal(bagValue, value);
    return;
  } else {
    const bagValue = nodeState.bag[`${property}`];
    assert.equal(_.isEqual(_.sortBy(bagValue), _.sortBy(JSON.parse(value))), true);
    return;
  }
});

Then("the result of {string} has the property {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node && state.status === "running");
  if(nodeState.result.activities[0].data) {
    this.resultHasProperty = Object.keys(nodeState.result.activities[0].data).includes(property);
  } else {
    this.resultHasProperty = Object.keys(nodeState.result.data).includes(property);
  }
  assert.equal(this.resultHasProperty, true);
  return;
});

Then("o result do nó {string} contém a propriedade {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node && state.status === "running");
  if(nodeState.result.activities[0].data) {
    this.resultHasProperty = Object.keys(nodeState.result.activities[0].data).includes(property);
  } else {
    this.resultHasProperty = Object.keys(nodeState.result.data).includes(property);
  }
  assert.equal(this.resultHasProperty, true);
  return;
});

Then("the process passed {int} times through {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.filter(state => state.node_id === node && state.status === "running");
  assert.equal(nodeState.length, passTimes);
  return;
});

Then("o processo passou {int} vezes pelo nó {string}", { timeout: 60 * 1000 }, async function (passTimes, node) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.filter(state => state.node_id === node && state.status === "running");
  assert.equal(nodeState.length, passTimes);
  return;
});

Then("the process passed at least {int} times through {string}", { timeout: 60 * 1000 }, async function (passTimes, node) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.filter(state => state.node_id === node && state.status === "running");
  assert.equal(nodeState.length >= passTimes, true);
  return;
});

Then("o processo passou pelo menos {int} vezes pelo nó {string}", { timeout: 60 * 1000 }, async function (passTimes, node) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.filter(state => state.node_id === node && state.status === "running");
  assert.equal(nodeState.length >= passTimes, true);
  return;
});

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
