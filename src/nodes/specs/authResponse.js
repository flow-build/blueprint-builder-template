module.exports = {
  id: "AUTH-RESPONSE",
  name: "AUTH RESPONSE",
  type: "Flow",
  next: {
    OK: "GENERATE-TOKEN", // Trocar para "GET-USER-BY-ID" quando o serviço estiver pronto
    default: "NOTIFY-USER"
  },
  lane_id: "sessionId",
  parameters: {
    input: {
      decision: { $ref: "result.data.status" }
    }
  }
}