# language: pt
Funcionalidade: fulfillment

  @delivered
  Cenario: produto entregado
    Dado que um usuario anonimo esta logado
    E que um processo de 'fulfillment' foi iniciado com os dados iniciais '{ "invoiceId": "" }'
    Então o processo passou pelo nó 'CONFIG'
    E na bag do nó 'SHIPMENT-STATUS' a propriedade 'shipment.status_code' é igual a 'DELIVERED'
    E o processo finaliza no nó 'END'

  @returned
  Cenario: produto devolvido
    Dado que um usuario anonimo esta logado
    E que um processo de 'fulfillment' foi iniciado com os dados iniciais '{ "invoiceId": "" }'
    Então o processo passou pelo nó 'CONFIG'
    E na bag do nó 'SHIPMENT-STATUS' a propriedade 'shipment.status_code' é igual a 'RETURNED'
    E o processo finaliza no nó 'END-ERROR'