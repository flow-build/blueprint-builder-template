# language: pt
Funcionalidade: testBlueprint

  @happy
  Cenario: happy path
    Dado que um usuario anonimo esta logado
    Dado que um processo de 'testBlueprint' foi iniciado com os dados iniciais ''
    Então o processo passa pelo nó 'CONFIG'
    Entao o processo para no nó 'NOTIFY'
    Quando o usuário submete '{}'
    Entao o processo finaliza no nó 'FINISH'
    