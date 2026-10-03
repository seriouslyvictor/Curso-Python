## Antes de começar

Pratique agrupar em dict, .setdefault(), busca em lista, min() com lambda com dados inspirados em API de Delivery. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "restaurante": "Burger House",
    "cardapio": [
        {"nome": "X-Burguer", "preco": 22.90, "categoria": "lanches", "ingredientes": ["pão", "carne", "queijo", "alface"]},
        {"nome": "X-Bacon", "preco": 28.90, "categoria": "lanches", "ingredientes": ["pão", "carne", "queijo", "bacon", "alface"]},
        {"nome": "Batata Frita P", "preco": 12.90, "categoria": "acompanhamentos", "ingredientes": ["batata", "sal"]},
        {"nome": "Batata Frita G", "preco": 18.90, "categoria": "acompanhamentos", "ingredientes": ["batata", "sal"]},
        {"nome": "Coca-Cola 350ml", "preco": 6.90, "categoria": "bebidas", "ingredientes": []},
        {"nome": "Suco Natural", "preco": 9.90, "categoria": "bebidas", "ingredientes": ["fruta", "água", "açúcar"]},
        {"nome": "Milk Shake", "preco": 16.90, "categoria": "sobremesas", "ingredientes": ["leite", "sorvete", "chocolate"]}
    ]
}
```

## Sua missão

1. Crie um dict agrupando os itens por categoria:
   {"lanches": ["X-Burguer", "X-Bacon"], "bebidas": [...], ...}

2. Calcule o preço médio por categoria.

3. Encontre todos os itens que contêm "queijo" nos ingredientes.

4. Crie um combo automático: o lanche mais barato + acompanhamento mais barato + bebida mais barata. Imprima os itens e o preço total.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Por categoria:
lanches: X-Burguer, X-Bacon
acompanhamentos: Batata Frita P, Batata Frita G
bebidas: Coca-Cola 350ml, Suco Natural
sobremesas: Milk Shake

Preço médio: lanches R$ 25.90, bebidas R$ 8.40, ...

Com queijo: X-Burguer, X-Bacon

Combo econômico:
X-Burguer + Batata Frita P + Coca-Cola 350ml = R$ 42.70
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Para agrupar, crie um dict vazio e use .setdefault(categoria, []).append(nome). Para o combo, filtre por categoria e pegue o min() com key=lambda.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: agrupar em dict, .setdefault(), busca em lista, min() com lambda.

Marque a prática como concluída quando conseguir explicar sua solução.
