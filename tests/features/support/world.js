require("dotenv").config();
const axios = require("axios");
const { logger } = require("../../../src/utils/logger");
const { setWorldConstructor } = require("@cucumber/cucumber");
const FLOWBUILD_URL = process.env.FLOWBUILD_URL;
const actualTimeout = setTimeout;
const mustache = require('mustache');
const _ = require('lodash');
const fs = require('fs');
const assert = require("assert").strict;

if (!fs.existsSync("tests/features/support/worldData.json")) {
  fs.writeFileSync("tests/features/support/worldData.json", "{}", (err) => {
    if (err) throw err;
  });
}
let worldData = require('./worldData.json');

function wait(ms = 5000) {
  return new Promise((resolve) => {
    actualTimeout(resolve, ms);
  });
}
class CustomWorld {
  constructor() {
    this.email = process.env.DEFAULT_EMAIL;
    this.password = process.env.DEFAULT_PASSWORD;
  }

  async getToken() {
    logger.info("getToken");
    const response = await axios({
      method: "post",
      url: "/login",
      baseURL: FLOWBUILD_URL,
      data: {
        email: this.email,
        password: this.password,
      },
    });
    logger.info("getToken received");
    this.token = response.data.jwtToken;
  }

  async getAnonymousToken() {
    logger.info("getAnonymousToken");
    const response = await axios({
      method: "post",
      url: "/token",
      baseURL: FLOWBUILD_URL,
    });
    logger.debug("getAnonymousToken received");
    this.token = response.data.jwtToken;
  }

  async startProcess(workflowName, initialBag) {
    logger.info(`startProcess ${workflowName}`);
    const response = await axios({
      method: "post",
      url: `/workflows/name/${workflowName}/start`,
      baseURL: FLOWBUILD_URL,
      headers: { Authorization: `Bearer ${this.token}` },
      data: JSON.parse(initialBag),
    });
    logger.debug("startProcess received");
    this.pid = response.data.process_id;
    logger.info(`PID ${this.pid}`);
    return;
  }

  async submitActivity(payload) {
    logger.info(`submitActivity ${this.amid}`);
    if(payload.includes('{{')) {
      await this.getProcessHistory();
      const middlePayload = JSON.parse(mustache.render(payload, worldData));
      const payloadPairs = Object.entries(middlePayload).map(subArr => subArr.map(value => value.toString()));
      this.resultPayload = Object.fromEntries(payloadPairs);
    } else {
      this.resultPayload = JSON.parse(payload);
    }
    const response = await axios({
      method: "post",
      url: `/activity_manager/${this.amid}/submit`,
      baseURL: FLOWBUILD_URL,
      headers: { Authorization: `Bearer ${this.token}` },
      data: this.resultPayload,
    });
    logger.debug("submitActivity response");
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  async waitProcessStop() {
    logger.info(`waitProcessStop ${this.pid}`);
    const expectedStatus = ["waiting", "error", "finished"];
    do {
      await wait(1000);
      await this.getCurrentState();
      logger.debug(`process status: ${this.currentStatus}`);
    } while (!expectedStatus.includes(this.currentStatus));
    return;
  }

  async getCurrentActivity() {
    logger.info(`getCurrentActivity ${this.pid}`);
    const response = await axios({
      method: "get",
      url: `/processes/${this.pid}/activity`,
      baseURL: FLOWBUILD_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    this.activity = response.data;
    this.amid = response.data.id;
    logger.info(`AMID ${this.amid}`);
    return;
  }

  async getCurrentState() {
    logger.info(`getCurrentState ${this.pid}`);
    const response = await axios({
      method: "get",
      url: `/processes/${this.pid}`,
      baseURL: FLOWBUILD_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    logger.debug("getCurrentState response");
    this.currentState = response.data;
    this.currentStatus = response.data.state.status;
    this.nodeId = response.data.state.node_id;
    return;
  }

  async getProcessHistory() {
    logger.info(`getProcessHistory ${this.pid}`);
    const response = await axios({
      method: "get",
      url: `/processes/${this.pid}/history`,
      baseURL: FLOWBUILD_URL,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    logger.debug(`getProcessHistory response ${response.status}`);
    this.history = response.data;
    return;
  }

  async saveValue(variable, property) {
    const nodeState = this.history[0];
    const stateHasProperty = _.has(nodeState, property);
    if(stateHasProperty) {
      const worldHasProperty = _.has(worldData, variable);
      if(!worldHasProperty) {
        worldData[variable] = _.get(nodeState, property);
        fs.writeFileSync("tests/features/support/worldData.json", JSON.stringify(worldData), err => {
          if (err) throw err;
        });
        logger.info(`Variável ${variable} salva no arquivo worldData.json com o valor: ${worldData[variable]}`);
        return;
      }
      logger.info(`Arquivo worldData.json já possui a variável ${variable} salva com o valor: ${worldData[variable]}`);
      return;
    }
    logger.info(`O processo não possui a propriedade ${property}`);
    return;
  }

  async checkBagValue(node, property, value) {
    const nodeState = this.history.find(state => state.node_id === node);
    this.bagValue = _.get(nodeState.bag, property);
    if (value.includes('{{')) {
      this.verifiedValue = _.get(worldData, value.replaceAll(/[{}]/g, ''));
    } else {
      this.verifiedValue = JSON.parse(value);
    }
    if (typeof this.bagValue != 'object') {
      assert.equal(this.bagValue.toString(), this.verifiedValue.toString());
      return true;
    } else {
      assert.equal(_.isEqual(_.sortBy(this.bagValue), _.sortBy(this.verifiedValue)), true);
      return true;
    }
  }

  async checkResultValue(node, property, value) {
    const nodeState = this.history.find(state => state.node_id === node);
    this.resultValue = _.get(nodeState.result, property);
    if (value.includes('{{')) {
      this.verifiedValue = _.get(worldData, value.replaceAll(/[{}]/g, ''));
    } else {
      this.verifiedValue = JSON.parse(value);
    }
    if (typeof this.resultValue != 'object') {
      assert.equal(this.resultValue.toString(), this.verifiedValue.toString());
      return true;
    } else {
      assert.equal(_.isEqual(_.sortBy(this.resultValue), _.sortBy(this.verifiedValue)), true);
      return true;
    }
  }

}

setWorldConstructor(CustomWorld);
