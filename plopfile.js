module.exports = function (plop) {
  plop.setHelper('upperCase', (txt) => txt.toUpperCase().replace(" ","-"));
  // create your generators here
  plop.setGenerator('blueprint', {
    description: 'set a new blueprint to start with',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'workflow name'
    },
    {
      type: 'input',
      name: 'description',
      message: 'workflow description'
    }],
    actions: [{
      type: 'add',
      path: 'src/blueprints/{{name}}.js',
      templateFile: 'templates/blueprint.hbs'
    }]
  });
  plop.setGenerator('node', {
    description: 'set a new node spec',
    prompts: [{
      type: 'list',
      name: 'type',
      message: 'node type',
      choices: ["finish","flow","formRequest","http","start","startProcess","subProcess","systemTask","timer","userTask"],
      loop: false
    },
    {
      type: 'input',
      name: 'name',
      message: 'node name'
    },
    {
      type: 'input',
      name: 'id',
      message: 'node id',
      default: function (response) {
        return response.name.toUpperCase().replace(" ","-");
      }
    }, {
      when: function (response) {
        return !["finish"].includes(response.type)
      },
      type: 'input',
      name: 'next',
      message: 'next node id (default option for flow nodes)',
      default: "END"
    },
    {
      type: 'input',
      name: 'lane',
      message: 'lane id',
      default: "free"
    }, {
      when: function (response) {
        return ["userTask"].includes(response.type)
      },
      type: 'input',
      name: 'action',
      message: "UserTask Action"
    }, {
      when: function (response) {
        return ["userTask"].includes(response.type)
      },
      type: 'list',
      name: 'activityManager',
      message: "Activity Manager Type",
      choices: ["commit","notify"],
      loop: false,
      default: "commit"
    }, {
      when: function (response) {
        return ["formRequest","http"].includes(response.type)
      },
      type: 'input',
      name: 'url',
      message: 'endpoint',
      default: "{ $mustache: 'any' }"
    }, {
      when: function (response) {
        return ["formRequest","http"].includes(response.type)
      },
      type: 'list',
      name: 'verb',
      message: 'endpoint',
      choices: ["GET","POST","PUT","PATCH","DELETE"],
      loop: false,
      default: "GET"
    }, {
      when: function (response) {
        return ["formRequest","http"].includes(response.type)
      },
      type: 'input',
      name: 'responseCodes',
      message: 'Valid Response Codes',
      default: "200,201,202"
    }, {
      when: function (response) {
        return ["formRequest","http"].includes(response.type)
      },
      type: 'number',
      name: 'maxLength',
      message: 'Max Content Length',
      default: 2000
    }, {
      when: function (response) {
        return ["startProcess","subProcess"].includes(response.type)
      },
      type: 'input',
      name: 'workflow',
      message: "Workflow name to start"
    }, {
      when: function (response) {
        return ["formRequest","http","start","timer","userTask"].includes(response.type)
      },
      type: 'number',
      name: 'timeout',
      message: "timeout in seconds",
      default: 600
    }, {
      when: function (response) {
        return ["systemTask"].includes(response.type)
      },
      type: 'input',
      name: 'category',
      message: "system task category"
    }],
    actions: function(data) {
      return [{
        type: 'add',
        path: 'src/nodes/specs/{{camelCase name}}.js',
        templateFile: `templates/${data.type}.hbs`
      }]
    }
  });
}