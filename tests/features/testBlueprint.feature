# language: pt
Funcionalidade: testBlueprint

  @happy
  Cenario: test path
    Dado que um usuario anonimo esta logado
    Dado que um processo de 'testBlueprint' foi iniciado com os dados iniciais ''
    Então o processo passa pelo nó 'CONFIG-TEST'
    Entao o processo para no nó 'NOTIFY-TEST'
    Quando o usuário submete '{}'
    Entao o processo finaliza no nó 'END-TEST'
    