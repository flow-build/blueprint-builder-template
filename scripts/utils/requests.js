require("dotenv").config();
const axios = require("axios");
const { logger } = require("../../src/utils/logger");

const BACKEND_URL = process.env.BACKEND_URL;

const actualTimeout = setTimeout;

function wait(ms = 5000) {
  return new Promise((resolve) => {
    actualTimeout(resolve, ms);
  });
}

const getBlueprintByName = async (name, config) => {
  logger.debug("called getBlueprintByName [%s]", name);

  const response = await axios({
    method: "get",
    url: `/workflows/name/${name}`,
    headers: { Authorization: `Bearer ${config.token}` },
    baseURL: BACKEND_URL,
  });
  return response.data.blueprint_spec;
};

const getBlueprintSpec = async (id, config) => {
  logger.debug("called getBlueprintSpec [%s]", id);

  const bp = await axios({
    method: "get",
    url: `/workflows/${id}`,
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
  });

  return bp.data;
};

const getWorkflows = async (config) => {
  logger.debug("called getWorkflows");
  const response = await axios({
    method: "get",
    url: "/workflows",
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
  });

  return response.data;
};

const compareBlueprint = async (blueprint, config) => {
  logger.debug("called compareBlueprint");
  const response = await axios({
    method: "post",
    url: "/cockpit/workflows/compare",
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
    data: blueprint,
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 400;
    },
  });

  return response;
};

const validateBlueprint = async (blueprint, config) => {
  logger.debug("called validateBlueprint for [%s]", blueprint.name);

  const response = await axios({
    method: "post",
    url: "/cockpit/workflows/validate",
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
    data: blueprint,
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 400;
    },
  });

  return response;
};

const publishBlueprint = async (blueprint, config) => {
  logger.debug("called publishBlueprint");

  const response = await axios({
    method: "post",
    url: "/workflows",
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
    data: blueprint,
  });

  return response.data;
};

const getProcessHistory = async (pid, config) => {
  logger.debug("called getProcessHistory for [%s]", pid);

  const response = await axios({
    method: "get",
    url: `/processes/${pid}/history`,
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
  });
  return response.data;
};

const startProcess = async (name, config, payload = {}) => {
  logger.debug("called startProcess for [%s]", name);

  const response = await axios({
    method: "post",
    url: `/workflows/name/${name}/start`,
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
    data: payload,
  });
  return response.data.process_id;
};

const getCurrentState = async (pid, config) => {
  logger.debug("called getCurrentState for [%s]", pid);

  const response = await axios({
    method: "get",
    url: `/processes/${pid}`,
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
  });
  return response.data;
};

const getPausedState = async (pid, config) => {
  logger.debug("called getPausedState for [%s]", pid);
  const expected_status = ["waiting", "error", "finished"];
  let current_state;
  do {
    current_state = await getCurrentState(pid, config);
    await wait(1000);
  } while (!expected_status.includes(current_state.current_status));

  return current_state;
};

const getCurrentActivity = async (pid, config) => {
  logger.debug("called getCurrentActivity for [%s]", pid);

  const response = await axios({
    method: "get",
    url: `/processes/${pid}/activity`,
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
  });
  return response.data;
};

const submitActivity = async (amid, config, payload) => {
  logger.debug("called submitActivity for [%s]", amid);

  const response = await axios({
    method: "post",
    url: `/activity_manager/${amid}/submit`,
    baseURL: BACKEND_URL,
    headers: { Authorization: `Bearer ${config.token}` },
    data: payload,
  });
  return response.data;
};

module.exports = {
  getBlueprintSpec,
  getBlueprintByName,
  getWorkflows,
  compareBlueprint,
  publishBlueprint,
  validateBlueprint,
  getProcessHistory,
  startProcess,
  getPausedState,
  getCurrentState,
  getCurrentActivity,
  submitActivity,
};
