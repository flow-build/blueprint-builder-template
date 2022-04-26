# language: pt
Funcionalidade: testBlueprint

  @happy
  Cenario: test happy path
    Dado que um usuario anonimo esta logado
    E que um processo de 'testBlueprint' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'GENERATE-TOKEN-TEST'
    Então salvo a variável 'token' com o valor de 'bag.token'
    E salvo a variável 'test_bag' com o valor de 'bag.test_bag'
    E a bag do nó 'CONFIG-TEST' contém a propriedade 'actor_id'
    E na bag do nó 'CHECK-COUNT-TEST' a propriedade 'test_bag' é igual a '{"second": "pizza", "first": "beer"}'
    E o processo para no nó 'CONFIRM-TOKEN-TEST'
    Quando o usuário submete '{ "token": {{token}} }'
    Entao o result do nó 'CONFIRM-TOKEN-TEST' contém a propriedade 'activities[0].data.token'
    E no result do nó 'CONFIRM-TOKEN-TEST' a propriedade 'activities[0].data.token' é igual a '{{token}}'
    E o processo passou pelo menos 2 vezes pelo nó 'COUNT-TEST'
    E o processo passou 3 vezes pelo nó 'CHECK-COUNT-TEST' 
    E o processo finaliza no nó 'END-TEST-SUCCESS'  
    
  @unhappy
  Cenario: test unhappy path
    Dado que um usuario anonimo esta logado
    E que um processo de 'testBlueprint' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'GENERATE-TOKEN-TEST'
    Então salvo a variável 'count' com o valor de 'bag.count'
    E a bag do nó 'GENERATE-TOKEN-TEST' contém a propriedade 'test_bag.first'
    E na bag do nó 'CHECK-COUNT-TEST' a propriedade 'count' é igual a '{{count}}'
    E o processo para no nó 'CONFIRM-TOKEN-TEST'
    Quando o usuário submete '{ "token": "123" }'
    Entao o result do nó 'CONFIRM-TOKEN-TEST' contém a propriedade 'activities[0].activity_manager_id'
    E no result do nó 'CONFIRM-TOKEN-TEST' a propriedade 'activities[0].data.token' é igual a '123'
    E o processo passou pelo menos 2 vezes pelo nó 'COUNT-TEST'
    E o processo passou 3 vezes pelo nó 'CHECK-COUNT-TEST' 
    E o processo finaliza no nó 'END-TEST-ERROR'
