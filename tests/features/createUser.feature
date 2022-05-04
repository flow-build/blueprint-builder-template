# language: pt
Funcionalidade: createUser

  @happy
  Cenario: usuario criado com sucesso
    Dado que um usuario anonimo esta logado
    E que um processo de 'createUser' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'CONFIG'
    E o processo para no nó 'INFORM-USER-DATA'
    Quando o usuário submete '{ "phone": "5592992559812", "email": "teste@email.com", "name": "Teste", "password": "1234" }'
    Então o result do nó 'INFORM-USER-DATA' contém a propriedade 'activities[0].data.email'
    E salvo a variável 'user' com o valor de 'bag.user'
    E o processo para no nó 'NOTIFY-SUCCESS'
    Quando o usuário submete '{}'
    Então o processo finaliza no nó 'END'
  
  @unhappy
  Cenario: email informado em uso
    Dado que um usuario anonimo esta logado
    E que um processo de 'createUser' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'CONFIG'
    E o processo para no nó 'INFORM-USER-DATA'
    Quando o usuário submete '{ "phone": "5592992559812", "email": "pedro@email.com", "name": "Pedro Assis", "password": "1234" }'
    Então o result do nó 'INFORM-USER-DATA' contém a propriedade 'activities[0].data.email'
    E o processo para no nó 'NOTIFY-ALREADY-EXISTS'
    Quando o usuário submete '{}'
    Então o processo finaliza no nó 'END-ERROR'
