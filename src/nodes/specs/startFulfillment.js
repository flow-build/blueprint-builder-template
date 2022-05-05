module.exports = [{
  id: "START-FULFILLMENT",
  name: "START FULFILLMENT",
  type: "Start",
  next: "CONFIG",
  lane_id: "free",
  parameters: {
    input_schema:
    {
      type: "object",
      required: [
        "order"
      ],
      properties: {
        order: {
          required: [
            "id"
          ],
          properties: {
            id: {
              type: "string",
              format: "uuid"
            }
          }
        }
      }
    }
  }
},
{
  id: "CONFIG",
  name: "CONFIG FULFILLMENT",
  next: "END",
  type: "SystemTask",
  category: "setToBag",
  lane_id: "free",
  parameters: {
    input: {
      postgrest: {
        url: '44.203.2.237:3000',
      },
      actor: {
        actorId: { $ref: "actor_data.actor_id" },
        sessionId: { $ref: "actor_data.session_id" }
      }
    },
  },
}];