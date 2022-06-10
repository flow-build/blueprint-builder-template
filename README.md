# Blueprint Builder

This repo objective is to help you to build nodes and blueprints for flowbuild using an IDE instead of the flowbuild studio.

## Flowbuild Compatibility

The repo presumes you are using the flowbuild API version 2.0.1 and engine version 2.8.0.

## Environment Variables

In order to actually sync with yoor engine, you need to set your ```FLOWBUILD_URL``` in your .env file.

## Scripts



### PLOP Scripts

The repo uses PLOP scripts to help build diagram templates and node specs.

You can call ```npm run plop``` or just ````plop``` if you wish to install plop globally.

Available Templates
- blueprints
- node

## Blueprint Automated Tests

We can perform blueprint automated tests and calculate the tests coverage using the package [flowbuild-coverage-calculator](https://www.npmjs.com/package/flowbuild-coverage-calculator). This lib runs automated tests using Cucumber, that uses Gherkin syntax, and we have some default commands/steps for testing blueprints on flowbuild that needs to be included in the cucumber file (with extension '.feature'). These files accepts steps in english and in portuguese. Check out below.

### '***Given***' steps

Steps that will describe the initial context of the scenario.

#### English

```feature
Given the default user is logged in # post email and password default (from .env) to get token from flowbuild
Given an anonymous user is logged in # get anonymous token from flowbuild
Given the user 'actor_id' is logged in # get token for the given actor_id (replace actor_id with the uuid value)
Given a 'testBlueprint' process started with the initial data of '{ "phone": "99994444" }' # start process of workflow named 'testBlueprint' with initial bag { "phone": "99994444" }
```
#### Portuguese

> ***Dado*** que o usuario padrao esta logado  // pega um token usando email e senha padrão (arquivo .env)
>
> ***Dado*** que um usuario anonimo esta logado  // pega um token anonimo
>
> ***Dado*** que o usuario 'actor_id' esta logado  // pega token pelo actor_id (substituir actor_id pelo valor uuid)
>
> ***Dado*** que um processo de 'testBlueprint' foi iniciado com os dados iniciais '{ "phone_number": "99994444" }'  
> // inicia um processo do workflow 'testBlueprint' com a bag inicial { "phone": "99994444" }

### '***When***' steps

Steps used to describe an event, or an action.

#### English

```feature
When the user submits '{ "token": "123" }' # simulate user interaction by submitting the payload { "token": "123" }

# this step also accepts to submit a variable that you save from the process using the syntax:

When the user submits '{ "token": {{token}} }'

# in that way the tests will look up if you saved a variable called 'token' and use its value on submit

```
#### Portuguese

> ***Quando*** o usuário submete '{ "token": "123" }' // simula a interação do usuário submetendo o payload { "token": "123" }
> 
> // esse step também aceita o submit de uma variável salva do processo, da seguinte forma:
>
> ***Quando*** o usuário submete { "token": {{token}} }'
>
> // dessa forma o teste irá procurar se existe uma variável 'token' salva e usar o seu valor no submit

### '***Then***' steps

Steps used to describe an expected outcome, or result.

#### English

```feature
Then the process passed through 'CONFIG' # checks if process passed through node 'CONFIG'
Then the process passed 3 times through 'CHECK-COUNT' # checks if process passed exactly 3 times through node 'CHECK-COUNT'
Then the process passed at least 3 times through 'CHECK-COUNT' # checks if process passed at least 3 times through node 'CHECK-COUNT'
Then the process waits at 'CONFIRM-TOKEN' # checks if process stopped on node 'CONFIRM-TOKEN' and waited for some action to happen
Then the process waits at 'CONFIRM-TOKEN' for 60 seconds # checks if process stopped on node 'CONFIRM-TOKEN', waited for 60 seconds and no action happened (action timeout)
Then the process finishes at 'END-SUCCESS' # checks if process endend on node 'END-SUCCESS'
Then save the variable 'token' with the value 'bag.token' # gets the value from the variable 'bag.token' of the process and save in the variable 'token' in 'worldData.json'
Then the bag of 'CONFIG' has the property 'phone_number' # checks if the bag of the node 'CONFIG' has a property called 'phone_number'
Then in the bag of 'CONFIG' the property 'phone_number' is equal to '99994444' # checks if the bag of the node 'CONFIG' has the property 'phone_number' with value '99994444'
Then the result of 'CONFIRM-TOKEN' has the property 'activities[0].data.token' # checks if the result of the node 'CONFIRM-TOKEN' has a property called 'activities[0].data.token'
Then in the result of 'CONFIRM-TOKEN' the property 'activities[0].data.token' is equal to '{{token}}' # checks if the result of the node 'CONFIRM-TOKEN' has the property 'activities[0].data.token' with value equal to variabel 'token' saved from the process on 'worldData.json'
```
#### Portuguese

> ***Entao*** o processo passou pelo nó 'CONFIG'  // verifica se o processoo passou pelo nó 'CONFIG'
>
> ***Entao*** o processo passou 3 vezes pelo nó 'CHECK-COUNT'  
>
> // verifica se o processo passou exatamente 3 vezes pelo nó 'CHECK-COUNT'
>
> ***Entao*** o processo passou pelo menos 3 vezes pelo nó 'CHECK-COUNT'  
>
> // verifica se o processo passou pelo menos 3 vezes pelo nó 'CHECK-COUNT'
>
> ***Entao*** o processo para no nó 'CONFIRM-TOKEN'  
>
> // verifica se o processo para no nó 'CONFIRM-TOKEN' e aguarda uma ação acontecer
>
> ***Entao*** o processo para no nó 'CONFIRM-TOKEN' por 60 segundos  
>
> // verifica se o processo para no nó 'CONFIRM-TOKEN', aguarda por 60 segundos e nenhuma ação ocorre (timeout da action)
>
> ***Entao*** o processo finaliza no nó 'END-SUCCESS'  // verifica se o processo finalizou no nó 'END-SUCCESS'
>
> ***Entao*** salvo a variável 'token' com o valor de 'bag.token'  
>
> // salva o valor da variável 'bag.token' do processo na variável 'token' no arquivo 'worldData.json'
>
> ***Entao*** a bag do nó 'CONFIG' contém a propriedade 'phone_number'  
>
> // verifica se a bag do nó 'CONFIG' possui uma propriedade chamada 'phone_number'
>
> ***Entao*** na bag do nó 'CONFIG' a propriedade 'phone_number' é igual a '99994444'  
>
> // verifica se a bag do nó 'CONFIRM-TOKEN' possui a propriedade 'phone_number' com o valor '99994444'
>
> ***Entao*** o result do nó 'CONFIRM-TOKEN' contém a propriedade 'activities[0].data.token'  
>
> // verifica se o result do nó 'CONFIRM-TOKEN' possui uma propriedade chamada 'activities[0].data.token'
>
> ***Entao*** no result do nó 'CONFIRM-TOKEN' a propriedade 'activities[0].data.token' é igual a '{{token}}'
>
> // verifica se o result do nó 'CONFIRM-TOKEN' possui a propriedade 'activities[0].data.token' com o valor da variável 'token' salva no arquivo 'worldData.json'
>