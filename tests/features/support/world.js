require("dotenv").config();
const axios = require("axios");
const { logger } = require("../../../src/utils/logger");
const { setWorldConstructor } = require("@cucumber/cucumber");
const FLOWBUILD_URL = process.env.FLOWBUILD_URL;
const actualTimeout = setTimeout;
const mustache = require('mustache');

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
      data: initialBag,
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
      const nodeState = this.history.find(state => state.status === "waiting");
      const middlePayload = JSON.parse(mustache.render(payload, nodeState.bag));
      const payloadPairs = Object.entries(middlePayload).map(subArr => subArr.map(value => value.toString()));
      const resultPayload = Object.fromEntries(payloadPairs);
      const response = await axios({
        method: "post",
        url: `/activity_manager/${this.amid}/submit`,
        baseURL: FLOWBUILD_URL,
        headers: { Authorization: `Bearer ${this.token}` },
        data: resultPayload,
      });
      logger.debug("submitActivity response");
      if (response.status === 200) {
        return true;
      }
      return false;
    }
    const response = await axios({
      method: "post",
      url: `/activity_manager/${this.amid}/submit`,
      baseURL: FLOWBUILD_URL,
      headers: { Authorization: `Bearer ${this.token}` },
      data: JSON.parse(payload),
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

    if (this.currentStatus === "waiting") {
      await this.getCurrentActivity();
    }
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
}

setWorldConstructor(CustomWorld);
