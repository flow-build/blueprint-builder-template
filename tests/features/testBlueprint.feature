# language: pt
Funcionalidade: testBlueprint

  @happy
  Cenario: test happy path
    Dado que um usuario anonimo esta logado
    E que um processo de 'testBlueprint' foi iniciado com os dados iniciais '{}'
    Então o processo passa pelo nó 'CONFIG-TEST'
    E a bag do nó 'CONFIG-TEST' contém a propriedade 'actor_id'
    E o processo para no nó 'CONFIRM-TOKEN-TEST'
    Quando o usuário submete '{ "token": {{token}} }'
    Entao o result do nó 'CONFIRM-TOKEN-TEST' contém a propriedade 'token'
    E o processo passou pelo menos 2 vezes pelo nó 'COUNT-TEST'
    E o processo passou 3 vezes pelo nó 'CHECK-COUNT-TEST' 
    E o processo finaliza no nó 'END-TEST-SUCCESS'  
    
  @unhappy
  Cenario: test unhappy path
    Dado que um usuario anonimo esta logado
    E que um processo de 'testBlueprint' foi iniciado com os dados iniciais '{}'
    Então o processo passa pelo nó 'CONFIG-TEST'
    E a bag do nó 'CONFIG-TEST' contém a propriedade 'account_id'
    E o processo para no nó 'CONFIRM-TOKEN-TEST'
    Quando o usuário submete '{ "token": "123" }'
    Entao o result do nó 'CONFIRM-TOKEN-TEST' contém a propriedade 'phone'
    E o processo passou pelo menos 2 vezes pelo nó 'COUNT-TEST'
    E o processo passou 3 vezes pelo nó 'CHECK-COUNT-TEST' 
    E o processo finaliza no nó 'END-TEST-ERROR'