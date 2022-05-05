module.exports = {
  id: "SEND-SMS",
  name: "SEND SMS",
  next: "END",
  type: "Systemtask",
  category: "formrequest",
  lane_id: "sessionId",
  parameters: {
    input: {
      To: { $ref: "bag.user.phone" },
      MessagingServiceSid: "MG0f3da17b79a8e112d94dbc581ae27e97",
    },
    request: {
      verb: "POST",
      url: { $mustache: "https://api.twilio.com/2010-04-01/Accounts/{{environment.TWILIO_ACCOUNT_ID}}/Messages.json" },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: { $mustache: "Basic {{{environment.TWILIO_AUTH_TOKEN}}}" },
      },
    },
    valid_response_codes: [200, 201, 202],
    timeout: 600,
    max_content_length: 2000,
  },
};
