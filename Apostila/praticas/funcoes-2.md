## Antes de começar

Pratique funções compostas, retornar dict, validação, formatação de moeda com dados inspirados em API de E-commerce. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
catalogo = {
    "001": {"nome": "Camiseta Básica", "preco": 49.90, "estoque": 20},
    "002": {"nome": "Calça Jeans", "preco": 129.90, "estoque": 8},
    "003": {"nome": "Tênis Runner", "preco": 299.90, "estoque": 3},
    "004": {"nome": "Boné Preto", "preco": 39.90, "estoque": 50},
    "005": {"nome": "Jaqueta Corta-Vento", "preco": 189.90, "estoque": 0}
}

pedido = [
    {"codigo": "001", "quantidade": 2},
    {"codigo": "003", "quantidade": 1},
    {"codigo": "005", "quantidade": 1},
    {"codigo": "004", "quantidade": 3}
]
```

## Sua missão

Crie as seguintes funções:

1. verificar_estoque(codigo, qtd) — retorna True se tem estoque suficiente, False se não.

2. calcular_subtotal(codigo, qtd) — retorna preço × quantidade.

3. processar_pedido(pedido) — percorre o pedido, verifica estoque de cada item, calcula o total, e retorna um dict com:
   {"itens_aprovados": [...], "itens_sem_estoque": [...], "total": valor}

4. gerar_resumo(resultado) — recebe o dict do pedido processado e imprime um resumo bonito.

Teste com o pedido fornecido.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
═══ RESUMO DO PEDIDO ═══
✅ Camiseta Básica (x2) — R$ 99.80
✅ Tênis Runner (x1) — R$ 299.90
❌ Jaqueta Corta-Vento — SEM ESTOQUE
✅ Boné Preto (x3) — R$ 119.70

Total: R$ 519.40
Itens sem estoque: 1
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Pense nesse sistema como uma loja real: antes de aprovar um item do pedido, o caixa verifica se tem no estoque. Comece criando as funções mais simples (verificar_estoque e calcular_subtotal) e teste elas sozinhas antes de juntar tudo.

</details>

<details>
<summary>Dica 2</summary>

verificar_estoque recebe o código do produto e a quantidade pedida. Ela olha no catálogo se o estoque daquele produto é maior ou igual à quantidade. calcular_subtotal é só multiplicar o preço pela quantidade.

</details>

<details>
<summary>Dica 3</summary>

processar_pedido é a função "chefe" — ela percorre cada item do pedido e USA as outras funções para tomar decisões. Crie duas listas (aprovados e sem estoque) e um total. Para cada item, chame verificar_estoque: se tiver, calcule o subtotal e adicione; se não tiver, coloque na lista de rejeitados.

</details>

<details>
<summary>Dica extra</summary>

processar_pedido() deve chamar verificar_estoque() e calcular_subtotal() internamente. Use listas para acumular aprovados e rejeitados.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: funções compostas, retornar dict, validação, formatação de moeda.

Marque a prática como concluída quando conseguir explicar sua solução.
