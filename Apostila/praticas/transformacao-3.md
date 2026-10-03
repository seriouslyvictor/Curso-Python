## Antes de começar

Pratique KDA como operação, agrupamento complexo, dict de dicts, taxa/porcentagem com dados inspirados em API de Games. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "jogador": "xDarkSlayer99",
    "jogo": "Valorant",
    "partidas": [
        {"mapa": "Ascent", "resultado": "vitoria", "kills": 22, "deaths": 14, "assists": 5, "agente": "Jett"},
        {"mapa": "Bind", "resultado": "derrota", "kills": 15, "deaths": 18, "assists": 8, "agente": "Sage"},
        {"mapa": "Haven", "resultado": "vitoria", "kills": 28, "deaths": 10, "assists": 3, "agente": "Jett"},
        {"mapa": "Ascent", "resultado": "vitoria", "kills": 19, "deaths": 16, "assists": 7, "agente": "Omen"},
        {"mapa": "Split", "resultado": "derrota", "kills": 11, "deaths": 20, "assists": 4, "agente": "Sage"},
        {"mapa": "Bind", "resultado": "vitoria", "kills": 25, "deaths": 12, "assists": 6, "agente": "Jett"},
        {"mapa": "Haven", "resultado": "derrota", "kills": 13, "deaths": 17, "assists": 9, "agente": "Sage"}
    ]
}
```

## Sua missão

1. Calcule o KDA de cada partida: (kills + assists) / deaths. Imprima junto com o mapa.

2. Calcule o KDA médio geral.

3. Calcule a taxa de vitória (winrate) em porcentagem.

4. Crie um dict com as estatísticas por agente:
   {"Jett": {"partidas": 3, "kills_total": 75, "kda_medio": 2.1}, ...}

5. Qual agente tem o melhor KDA médio?

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
KDA por partida:
Ascent: 1.93 (vitória)
Bind: 1.28 (derrota)
...

KDA médio geral: 1.54
Winrate: 57.1%

Stats por agente:
Jett: 3 partidas, 75 kills, KDA médio 2.08
Sage: 3 partidas, 39 kills, KDA médio 0.69
Omen: 1 partida, 19 kills, KDA médio 1.63

Melhor agente: Jett
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Para estatísticas por agente: crie um dict onde a chave é o nome do agente e o valor é outro dict com os acumuladores. Cuidado com divisão por zero no deaths!

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: KDA como operação, agrupamento complexo, dict de dicts, taxa/porcentagem.

Marque a prática como concluída quando conseguir explicar sua solução.
