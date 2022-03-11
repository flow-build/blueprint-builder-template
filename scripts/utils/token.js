require("dotenv").config();
const axios = require("axios");
const { logger } = require("../../src/utils/logger");

const BACKEND_URL = process.env.BACKEND_URL;

const getToken = async (actorId, claims) => {
  logger.debug("called getToken");

  const response = await axios({
    method: "post",
    url: "/token",
    baseURL: BACKEND_URL,
    data: {
      actor_id: actorId,
      claims,
    },
  });

  return response.data.jwtToken;
};

module.exports = {
  getToken,
};
