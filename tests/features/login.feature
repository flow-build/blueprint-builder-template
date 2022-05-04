# language: pt
Funcionalidade: login

  @happy
  Cenario: login realizado com sucesso
    Dado que um usuario anonimo esta logado
    E que um processo de 'login' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'CONFIG'
    E o processo para no nó 'INFORM-CREDENTIALS'
    Quando o usuário submete '{ "email": "testepedro@email.com", "password": "1234" }'
    Então o result do nó 'INFORM-CREDENTIALS' contém a propriedade 'activities[0].data.email'
    E o result do nó 'INFORM-CREDENTIALS' contém a propriedade 'activities[0].data.password'
    E a bag do nó 'USER-BAG' contém a propriedade 'user'
    E salvo a variável 'token' com o valor de 'bag.token'
    E o processo para no nó 'CONFIRM-TOKEN'
    Quando o usuário submete '{ "token": {{token}} }'
    Então o processo para no nó 'DELIVER-JWT'
    Quando o usuário submete '{}'
    Então o processo finaliza no nó 'END'
  
  @unhappy
  Cenario: email ou senha errados
    Dado que um usuario anonimo esta logado
    E que um processo de 'login' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'CONFIG'
    E o processo para no nó 'INFORM-CREDENTIALS'
    Quando o usuário submete '{ "email": "testepedro@email.com", "password": "12" }'
    Então o result do nó 'INFORM-CREDENTIALS' contém a propriedade 'activities[0].data.email'
    E o processo para no nó 'NOTIFY-USER'
    Quando o usuário submete '{}'
    Então o processo finaliza no nó 'END-ERROR'
  
  @unhappy
  Cenario: token errado
    Dado que um usuario anonimo esta logado
    E que um processo de 'login' foi iniciado com os dados iniciais '{}'
    Então o processo passou pelo nó 'CONFIG'
    E o processo para no nó 'INFORM-CREDENTIALS'
    Quando o usuário submete '{ "email": "testepedro@email.com", "password": "1234" }'
    Então o result do nó 'INFORM-CREDENTIALS' contém a propriedade 'activities[0].data.email'
    E o result do nó 'INFORM-CREDENTIALS' contém a propriedade 'activities[0].data.password'
    E a bag do nó 'USER-BAG' contém a propriedade 'user'
    E o processo para no nó 'CONFIRM-TOKEN'
    Quando o usuário submete '{ "token": "1234" }'
    Então o processo para no nó 'NOTIFY-USER'
    Quando o usuário submete '{}'
    Então o processo finaliza no nó 'END-ERROR'