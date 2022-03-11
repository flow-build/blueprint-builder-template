const return_true = () => {
  return ["fn", ["&", "args"], true];
};

const validate_claim = (claim) => {
  return [
    "fn",
    ["actor_data", "bag"],
    ["eval", ["apply", "or", ["map", ["fn", ["v"], ["=", "v", ["`", claim]]], ["get", "actor_data", ["`", "claims"]]]]],
  ];
};

module.exports = {
  return_true,
  validate_claim,
};
