# language: pt
Funcionalidade: order

  @happy
  Cenario: pedido criado com sucesso
    Dado que o usuario '{ "email": "user@test.com", "password": "1234" }' esta logado
    E que um processo de 'order' foi iniciado com os dados iniciais '{ "cartId": "" }'
    Então o processo passou pelo nó 'CONFIG'
    E o processo passou pelo nó 'PAYMENT-OPTIONS-BAG'
    E salvo a variável 'paymentOptions' com o valor de 'bag.paymentOptions'
    E o processo para no nó 'SELECT-PAYMENT'
    Quando o usuário submete '{ "paymentOptions": [{ "id": "", "amount":  }] }'
    Então o result do nó 'SELECT-PAYMENT' contém a propriedade 'activities[0].data.payments'
    E o result do nó 'SELECT-PAYMENT' contém a propriedade 'activities[0].data.useWallet'
    E a bag do nó 'ORDER-BAG' contém a propriedade 'order'
    E o processo finaliza no nó 'END-ORDER-SUCCESS'
  
  @unhappy
  Cenario: erro ao fazer pedido
    Dado que o usuario '{ "email": "user@test.com", "password": "1234" }' esta logado
    E que um processo de 'order' foi iniciado com os dados iniciais '{ "cartId": "" }'
    Então o processo passou pelo nó 'CONFIG'
    E o processo passou pelo nó 'PAYMENT-OPTIONS-BAG'
    E salvo a variável 'paymentOptions' com o valor de 'bag.paymentOptions'
    E o processo para no nó 'SELECT-PAYMENT'
    Quando o usuário submete '{ "paymentOptions": [{ "id": "", "amount":  }] }'
    Então no result do nó 'CREATE-ORDER-RESPONSE' a propriedade 'status' é igual a '422'
    E o processo para no nó 'NOTIFY USER'
    Quando o usuário submete '{}'
    Então o processo finaliza no nó 'END-ORDER-ERROR'
