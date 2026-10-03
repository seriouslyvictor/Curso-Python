## Antes de começar

Pratique for loop, multiplicação no loop, min/max manual, estoque zero com dados inspirados em API de E-commerce. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "loja": "TechBR",
    "produtos": [
        {"nome": "Fone Bluetooth", "preco": 89.90, "estoque": 45, "categoria": "audio"},
        {"nome": "Webcam HD", "preco": 199.90, "estoque": 0, "categoria": "video"},
        {"nome": "Teclado Mecânico", "preco": 349.90, "estoque": 12, "categoria": "perifericos"},
        {"nome": "Mouse Gamer", "preco": 159.90, "estoque": 30, "categoria": "perifericos"},
        {"nome": "Caixa de Som", "preco": 129.90, "estoque": 0, "categoria": "audio"},
        {"nome": "Monitor 24pol", "preco": 899.90, "estoque": 5, "categoria": "video"},
        {"nome": "Hub USB-C", "preco": 79.90, "estoque": 60, "categoria": "acessorios"}
    ]
}
```

## Sua missão

1. Imprima cada produto no formato: "Fone Bluetooth - R$ 89.90 (45 em estoque)"

2. Imprima quais produtos estão SEM estoque.

3. Calcule o valor total em estoque (preço × quantidade de cada item, somados).

4. Encontre o produto mais caro e o mais barato.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Fone Bluetooth - R$ 89.90 (45 em estoque)
Webcam HD - R$ 199.90 (0 em estoque)
...

Sem estoque: Webcam HD, Caixa de Som

Valor total em estoque: R$ 67384.00

Mais caro: Monitor 24pol (R$ 899.90)
Mais barato: Hub USB-C (R$ 79.90)
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Pense nesse exercício como organizar uma loja: você passa por cada produto na prateleira e anota as informações. Comece imprimindo cada produto com seu preço e estoque — isso é só um for com uma f-string.

</details>

<details>
<summary>Dica 2</summary>

Produto sem estoque é aquele que tem estoque igual a zero. Para o valor total em estoque, pense assim: se tem 45 fones de R$ 89.90, o valor em fones na loja é 45 x 89.90. Some isso para todos os produtos.

</details>

<details>
<summary>Dica 3</summary>

Para achar o mais caro e mais barato, use a mesma ideia da "fila": guarde o produto atual como candidato e compare com cada novo produto. Comece com o primeiro produto como referência e vá atualizando se encontrar um com preço maior (ou menor).

</details>

<details>
<summary>Dica extra</summary>

Para valor em estoque: multiplique preço × estoque de cada produto e acumule. Para mais caro/barato, guarde o produto atual e compare a cada iteração.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: for loop, multiplicação no loop, min/max manual, estoque zero.

Marque a prática como concluída quando conseguir explicar sua solução.
