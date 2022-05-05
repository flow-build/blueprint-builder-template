const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const _ = require('lodash');

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

Given("the user {string} is logged in", { timeout: 60 * 1000 }, async function (actor_id) {
  await this.auth(actor_id);
  return;
});

Given("que o usuario {string} esta logado", { timeout: 60 * 1000 }, async function (actor_id) {
  await this.auth(actor_id);
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

Then("the process passed through {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  assert.equal(nodeState.node_id, node);
  assert.equal(nodeState.status, "running");
  return;
});

Then("o processo passou pelo nó {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  assert.equal(nodeState.node_id, node);
  assert.equal(nodeState.status, "running");
  return;
});

Then("the bag of {string} has the property {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  const bagHasProperty = _.has(nodeState.bag, property);
  assert.equal(bagHasProperty, true);
  return;
});

Then("a bag do nó {string} contém a propriedade {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node);
  const bagHasProperty = _.has(nodeState.bag, property);
  assert.equal(bagHasProperty, true);
  return;
});

Then("in the bag of {string} the property {string} is equal to {string}", { timeout: 60 * 1000 }, async function (node, property, value) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const response = await this.checkBagValue(node, property, value);
  assert.equal(response, true);
  return;
});

Then("na bag do nó {string} a propriedade {string} é igual a {string}", { timeout: 60 * 1000 }, async function (node, property, value) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const response = await this.checkBagValue(node, property, value);
  assert.equal(response, true);
  return;
});

Then("in the result of {string} the property {string} is equal to {string}", { timeout: 60 * 1000 }, async function (node, property, value) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const response = await this.checkResultValue(node, property, value);
  assert.equal(response, true);
  return;
});

Then("no result do nó {string} a propriedade {string} é igual a {string}", { timeout: 60 * 1000 }, async function (node, property, value) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const response = await this.checkResultValue(node, property, value);
  assert.equal(response, true);
  return;
});

Then("the result of {string} has the property {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node) && state.status === "running";
  const resultHasProperty = _.has(nodeState.result, property);
  assert.equal(resultHasProperty, true);
  return;
});

Then("o result do nó {string} contém a propriedade {string}", { timeout: 60 * 1000 }, async function (node, property) {
  await this.waitProcessStop();
  await this.getProcessHistory();
  const nodeState = this.history.find(state => state.node_id === node && state.status === "running");
  const resultHasProperty = _.has(nodeState.result, property);
  assert.equal(resultHasProperty, true);
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

Then("save the variable {string} with the value {string}", { timeout: 60 * 1000 }, async function (variable, property) {
  await this.getProcessHistory();
  await this.saveValue(variable, property);
  return;
});

Then("salvo a variável {string} com o valor de {string}", { timeout: 60 * 1000 }, async function (variable, property) {
  await this.getProcessHistory();
  await this.saveValue(variable, property);
  return;
});


When("the user submits {string}", { timeout: 60 * 1000 }, async function (payload) {
  await this.getProcessHistory();
  await this.submitActivity(payload);
  return;
});

When("o usuário submete {string}", { timeout: 60 * 1000 }, async function (payload) {
  await this.getProcessHistory();
  await this.submitActivity(payload);
  return;
});

Then("the process waits at {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  await this.getCurrentActivity();
  assert.equal(this.currentStatus, "waiting");
  assert.equal(this.nodeId, node);
  return;
});

Then("o processo para no nó {string}", { timeout: 60 * 1000 }, async function (node) {
  await this.waitProcessStop();
  await this.getCurrentActivity();
  assert.equal(this.currentStatus, "waiting");
  assert.equal(this.nodeId, node);
  return;
});

Then("the process waits at {string} for {int} seconds", { timeout: 60 * 1000 }, async function (node, timeout) {
  await this.waitProcessStop(timeout);
  assert.equal(this.currentStatus, "waiting");
  assert.equal(this.nodeId, node);
  return;
});

Then("o processo para no nó {string} por {int} segundos", { timeout: 60 * 1000 }, async function (node, timeout) {
  await this.waitProcessStop(timeout);
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
