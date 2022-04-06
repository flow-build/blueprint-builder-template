module.exports = {
  id: "CONFIG",
  name: "CONFIG",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      supertokens: {
        url: process.env.SUPERTOKENS_URL,
        apiKey: process.env.SUPERTOKENS_API_KEY
      },
      postgrest: {
        url: process.env.POSTGREST_URL,
      },
      twilio: {
        phone: '+5511968548891',
        accountId: process.env.TWILIO_ACCOUNT_ID,
        authToken: process.env.TWILIO_AUTH_TOKEN
      },
      actor: {
        actorId: { $ref: "actor_data.actor_id" },
        sessionId: { $ref: "actor_data.session_id" }
      }
    },
  },
};
