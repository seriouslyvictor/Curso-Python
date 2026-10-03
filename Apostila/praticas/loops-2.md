## Antes de começar

Pratique for loop, operações dentro do loop, comparação / máximo com dados inspirados em API de Futebol. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "campeonato": "Brasileirão Série A",
    "rodada": 20,
    "classificacao": [
        {"pos": 1, "time": "Botafogo", "pontos": 43, "vitorias": 13, "gols_pro": 35, "gols_contra": 18},
        {"pos": 2, "time": "Palmeiras", "pontos": 40, "vitorias": 12, "gols_pro": 33, "gols_contra": 15},
        {"pos": 3, "time": "Flamengo", "pontos": 37, "vitorias": 11, "gols_pro": 30, "gols_contra": 19},
        {"pos": 4, "time": "Fortaleza", "pontos": 36, "vitorias": 10, "gols_pro": 27, "gols_contra": 20},
        {"pos": 5, "time": "São Paulo", "pontos": 35, "vitorias": 10, "gols_pro": 28, "gols_contra": 21},
        {"pos": 6, "time": "Cruzeiro", "pontos": 32, "vitorias": 9, "gols_pro": 25, "gols_contra": 22}
    ]
}
```

## Sua missão

1. Imprima cada time com sua posição e pontos:
   "1º Botafogo - 43 pts"

2. Imprima o saldo de gols de cada time (gols_pro - gols_contra).

3. Encontre e imprima qual time tem mais vitórias.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
1º Botafogo - 43 pts
2º Palmeiras - 40 pts
3º Flamengo - 37 pts
4º Fortaleza - 36 pts
5º São Paulo - 35 pts
6º Cruzeiro - 32 pts

Saldos de gols:
Botafogo: +17
Palmeiras: +18
Flamengo: +11
Fortaleza: +7
São Paulo: +7
Cruzeiro: +3

Time com mais vitórias: Botafogo (13)
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

São três tarefas, mas todas usam o mesmo truque: percorrer a lista de times com um "for". Resolva uma de cada vez — comece imprimindo a posição e os pontos de cada time.

</details>

<details>
<summary>Dica 2</summary>

O saldo de gols é como o saldo da conta bancária: o que entrou menos o que saiu. Subtraia gols_contra de gols_pro para cada time. Para achar o time com mais vitórias, pense assim: se você está numa fila e quer achar a pessoa mais alta, você compara cada uma com a mais alta que viu até agora.

</details>

<details>
<summary>Dica 3</summary>

Antes do loop, crie duas variáveis: melhor_time = "" e mais_vitorias = 0. Dentro do loop, se o time atual tem mais vitórias que mais_vitorias, atualize as duas variáveis. No final do loop, você terá o campeão de vitórias.

</details>

<details>
<summary>Dica extra</summary>

Para encontrar o time com mais vitórias, use uma variável para guardar o melhor até agora e compare a cada volta do loop.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: for loop, operações dentro do loop, comparação / máximo.

Marque a prática como concluída quando conseguir explicar sua solução.
