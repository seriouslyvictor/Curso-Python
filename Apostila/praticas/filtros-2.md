## Antes de começar

Pratique for + if/else, acumulador por categoria, porcentagem, emoji condicional com dados inspirados em API de Dashboard. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "periodo": "2024-Q3",
    "vendas": [
        {"vendedor": "Ana", "valor": 15000, "regiao": "SP", "meta": 12000},
        {"vendedor": "Bruno", "valor": 8500, "regiao": "RJ", "meta": 10000},
        {"vendedor": "Carla", "valor": 22000, "regiao": "SP", "meta": 18000},
        {"vendedor": "Diego", "valor": 11000, "regiao": "MG", "meta": 10000},
        {"vendedor": "Elena", "valor": 9000, "regiao": "RJ", "meta": 12000},
        {"vendedor": "Fábio", "valor": 19500, "regiao": "SP", "meta": 15000},
        {"vendedor": "Gabi", "valor": 7200, "regiao": "MG", "meta": 10000}
    ]
}
```

## Sua missão

1. Imprima quem BATEU a meta e quem NÃO bateu:
   "Ana: R$ 15000 ✅ (meta: R$ 12000)"
   "Bruno: R$ 8500 ❌ (meta: R$ 10000)"

2. Calcule o total de vendas por região (SP, RJ, MG).

3. Calcule a porcentagem de vendedores que bateram a meta.

4. Encontre o vendedor com maior diferença positiva acima da meta.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Ana: R$ 15000 ✅ (meta: R$ 12000)
Bruno: R$ 8500 ❌ (meta: R$ 10000)
...

SP: R$ 56500 | RJ: R$ 17500 | MG: R$ 18200

Bateram a meta: 57.1%

Maior destaque: Carla (+R$ 4000 acima da meta)
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Para cada vendedor, compare o valor vendido com a meta. Se vendeu mais ou igual à meta, bateu. Se vendeu menos, não bateu. É como comparar a nota de uma prova com a nota mínima para passar.

</details>

<details>
<summary>Dica 2</summary>

Para somar por região, imagine três caixinhas — uma para SP, uma para RJ, uma para MG. Crie um dicionário com essas três regiões começando em zero. Dentro do loop, olhe a região do vendedor e coloque o valor na caixinha certa.

</details>

<details>
<summary>Dica 3</summary>

Para a porcentagem, conte quantos bateram a meta (um contador que soma 1 a cada "aprovado") e divida pelo total de vendedores, multiplicando por 100. Para o destaque, calcule valor - meta para cada um e guarde o que tiver a maior diferença.

</details>

<details>
<summary>Dica extra</summary>

Para total por região, crie um dict como totais = {"SP": 0, "RJ": 0, "MG": 0} e acumule dentro do loop. Para porcentagem: (acertos / total) * 100.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: for + if/else, acumulador por categoria, porcentagem, emoji condicional.

Marque a prática como concluída quando conseguir explicar sua solução.
