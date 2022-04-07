# language: pt
Funcionalidade: testBlueprint

  @happy
  Cenario: test happy path
    Dado que um usuario anonimo esta logado
    Dado que um processo de 'testBlueprint' foi iniciado com os dados iniciais ''
    Então o processo passa pelo nó 'CONFIG-TEST'
    Entao o processo para no nó 'CONFIRM-TOKEN-TEST'
    Quando o usuário submete '{ "token": {{token}} }'
    Entao o processo passou pelo menos 2 vezes pelo nó 'COUNT-TEST'
    Entao o processo passou 3 vezes pelo nó 'CHECK-COUNT-TEST' 
    Entao o processo finaliza no nó 'END-TEST-SUCCESS'  
    
  @unhappy
  Cenario: test unhappy path
    Dado que um usuario anonimo esta logado
    Dado que um processo de 'testBlueprint' foi iniciado com os dados iniciais ''
    Então o processo passa pelo nó 'CONFIG-TEST'
    Entao o processo para no nó 'CONFIRM-TOKEN-TEST'
    Quando o usuário submete '{ "token": "123" }'
    Entao o processo passou pelo menos 2 vezes pelo nó 'COUNT-TEST'
    Entao o processo passou 3 vezes pelo nó 'CHECK-COUNT-TEST' 
    Entao o processo finaliza no nó 'END-TEST-ERROR'