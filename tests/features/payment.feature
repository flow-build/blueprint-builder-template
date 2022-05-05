# language: pt
Funcionalidade: payment

  @happy
  Cenario: pagamento realizado com sucesso
    Dado que o usuario '5af567a8-efb2-414d-9339-5be644c36639' esta logado
    E que um processo de 'payment' foi iniciado com os dados iniciais '{ "orderId": "d7f98fbc-f4ae-420d-9db7-ab08555d5fa1" }'
    Então o processo passou pelo nó 'START_1'
    E o result do nó 'PENDING-PAYMENT-PICK-FIRST' contém a propriedade 'data'
    E o result do nó 'PENDING-PAYMENT-PICK-FIRST' contém a propriedade 'data'
    E no result do nó 'SEND-SMS' a propriedade 'status' é igual a '201'
    E o processo finaliza no nó 'END'
  
  @unhappy
  Cenario: erro no pagamento
    Dado que o usuario '5af567a8-efb2-414d-9339-5be644c36639' esta logado
    E que um processo de 'payment' foi iniciado com os dados iniciais '{ "orderId": "d7f98fbc-f4ae-420d-9db7-ab08555d5fa1" }'
    Então o processo passou pelo nó 'START_1'
    E o result do nó 'PENDING-PAYMENT-PICK-FIRST' contém a propriedade 'data'
    E o result do nó 'PENDING-PAYMENT-PICK-FIRST' contém a propriedade 'data'
    E o processo passou pelo nó 'TRACE-ERROR'
    Então o processo finaliza no nó 'END-ERROR'
