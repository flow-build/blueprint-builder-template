# blueprint-builder-template
---

## Node ID standard

Depending of the project, you can use different patterns to use on the Nodes Ids. Its recommended something easy to read and intuitive, like ACTION + ATTRIBUTE(OR DOMAIN). For demonstration purposes, lets imagine a workflow called 'fetchData'

* Start Node (Its usefull to have the workflow name here to track it better into the api)
    * "ID": "START-FETCH-DATA" 
    * "NAME": "Start fetchData" 

* setToBag Node
    * "ID": "BAG-DATA"
    * "NAME": "Store Data"
  
* setToBag Node - Process parameters (Sometimes you will want/need to store some data at the start of the process)
    * "ID": "CONFIG"
    * "NAME": "Store process parameters" 

* HTTP Node
    * "ID": "GET-TOKEN"
    * "NAME": "Fetch Token"

* Flow Node - Check the response of some request
    * "ID": "GET-TOKEN-RESPONSE"
    * "NAME": "Check if the token was fetched successfully"

* User Task Node
    * "ID": "ALERT-FETCH-TOKEN-ERROR"
    * "NAME": "Notifies the user there was an error fetching the token"
    * "ACTION": "SHOW_ALERT"

* Finish Node (For better tracking purposes, its recommended to have different finish nodes to different scenarios)
    * "ID": "FINISH-FETCH-DATA"
    * "NAME": "Finish fetchData"

## Folder organization

Its recommended to have the directory structure organized just like this: 

* MyFlowbuildBlueprints
    * scripts
        * utils
    * src
        * blueprints
        * forms
        * lanes
        * nodes
            * examples
            * schemas
            * specs
        * utils
    * tests
 
## File syntax

The naming of the files could have the following syntax:

* Nodes: Usually the node ID has the same name as the file(i.e.: ID: "CONFIG", filename: config.js)

* Blueprints: Use the camelCase naming(all words capitalized except the first) and receive the name accordingly to the combination of ACTION + ATRIBUTE (i.e.: fetchData.js)

## Node structure standard

Nodes can be classified in 5 types: Start, Finish, systemTask, userTask and flow. Each one has shared and unique attributes. They always have **id**, **name**, **type**, **lane_id**, **parameters** and **next**(this one is a bit different with flowNodes).

### start
* The first node you'll use. It defines where and how the blueprint will start. A json schema can be used to specify the content that should be passed to the request that will start the workflow.

~~~js
module.exports = {
      id: 'START-LOGIN',
      name: 'Start login',
      type: 'Start',
      next: 'LOGIN',
      lane_id: 'anonymous',
      parameters: {
        input_schema: {},
      },
    }
~~~
### finish
* Indicates the finish of the workflow. As said before, it's strongly recommended that multiple finish nodes are used to multiple finish scenarios.
~~~js
module.exports = {
      id: 'FINISH-LOGIN-SUCCESS',
      name: 'Finish login - success',
      next: null,
      type: 'Finish',
      lane_id: 'authenticated',
    }
~~~


~~~js
module.exports = {
      id: 'FINISH-LOGIN-ERROR',
      name: 'Finish login - error',
      next: null,
      type: 'Finish',
      lane_id: 'anonymous',
    }
~~~

### systemTask
 * They differ mainly by the **category** attribute. A http request will look like this:
~~~js
module.exports = {
  id: 'LOGIN',
  name: 'Store process parameters',
  next: 'CHECK-LOGIN-RESPONSE',
  type: 'SystemTask',
  lane_id: 'anonymous',
  category: 'HTTP',
      parameters: {
        input: {
          email: { $ref: 'bag.email' },
          password: { $decrypt: 'bag.password' }
        },
        request: {
          url: 'https://myapi.com/login',
          verb: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      },
};
~~~

### userTask
* A userTask usually representes some interactivity with the user, like a modal with an alert. 
~~~js
module.exports = {
  id: "ALERT-LOGIN-ERROR",
  type: "UserTask",
  name: "Alerts user the login failed",
  next: "FINISH-LOGIN-ERROR",
  lane_id: "anonymous",
  parameters: {
    action: "SHOW_ALERT",
    input: {
      message: {
        $mustache: "There was an error with the login! {{result.message}}",
      },
    },
    timeout: 10,
  },
};
~~~

### flow
* It works like an **switch** operator, defining where the process will *flow* depending from the given condition.
~~~js
module.exports = {
      id: 'LOGIN-RESPONSE',
      name: 'The login was successful?',
      next: {
        default: 'ALERT-LOGIN-ERROR',
        '200': 'REDIRECT-TO-APPLICATION',
        '401': 'ALERT-LOGIN-ERROR',
      },
      type: 'Flow',
      lane_id: 'anonymous',
      parameters: {
        input: {
          decision: {
            $ref: 'result.response_code',
          },
        },
      },
    }

~~~
## Blueprint structure standard

The blueprints should have the following structure standard. **Name** and **Description** are unique to the blueprint. The **nodes** array contains all the nodes used in the blueprint, and they always should have at least the **nodeSpec** attribute. If the used node is generic and/or incomplete in the file, the remaining attributes could be added here. The **next** attribute could be either in the nodeSpec file, or inside the object, and always indicates the next node in the chain.

~~~js
const { getLanes } = require("../lanes/lanes");
const { getNodes } = require("../nodes/index");

const name = "login";
const description = "authenticate and redirect and anonymous user to the application"

const nodes = [
  {
    nodeSpec: "startLogin",
  },
  {
    nodeSpec: "login",
    next: "CHECK-LOGIN-RESPONSE", 
  },
  {
    nodeSpec: "checkLoginResponse", // No need to define next node here, its already defined inside the nodeSpec
  },
  {
    nodeSpec: "redirectToApplication",
    next: "FINISH-LOGIN-SUCCESS",
  },
  {
    nodeSpec: "finishLoginSuccess",
  },
  {
    nodeSpec: "alertLoginError",
    next: "FINISH-LOGIN-ERROR",
  },
  {
    nodeSpec: "finishLoginError",
  }
];

module.exports = {
  name: name,
  description: description,
  blueprint_spec: {
    requirements: ["core"],
    prepare: [],
    nodes: getNodes(nodes),
    lanes: getLanes(getNodes(nodes)),
    environment: {
      BASE_URL: "BASE_URL",
    },
  },
};
~~~

## Lint standard

```js
module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'max-len': 'off',
    camelcase: 'off',
    indent: ['error', 2],
    'no-undef': 'off'
  }
}
```