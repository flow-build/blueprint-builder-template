module.exports = [
	{
		id: "CREATE-PROFILE",
		name: "CREATE PROFILE",
		next: "END",
		type: "SystemTask",
		category: "HTTP",
		lane_id: "sessionId",
		parameters: {
			input: {
				email: { $ref: "bag.email" },
				phone: { $ref: "password" },
				name: { $ref: "name" }
			},
			request: {
				verb: "POST",
				url: { $mustache: "http://{{environment.POSTGREST_URL}}/user?id=eq.{{result.external_id}}" },
				headers: {
					ContentType: "application/json",
					Accept: "application/vnd.pgrst.object+json"
				},
			},
			valid_response_codes: [200, 201, 202],
			timeout: 600,
			max_content_length: 10000,
		},
	}
];
