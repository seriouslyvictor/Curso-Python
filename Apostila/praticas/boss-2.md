## Antes de começar

Pratique sistema completo, atualizar dois registros por iteração, ordenação multi-critério, retrospecto com dados inspirados em Simulador de Campeonato. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "campeonato": "Copa SENAI",
    "times": ["Python FC", "Java United", "C++ Rovers", "JavaScript City"],
    "jogos": [
        {"mandante": "Python FC", "visitante": "Java United", "gols_mandante": 3, "gols_visitante": 1},
        {"mandante": "C++ Rovers", "visitante": "JavaScript City", "gols_mandante": 2, "gols_visitante": 2},
        {"mandante": "Python FC", "visitante": "C++ Rovers", "gols_mandante": 1, "gols_visitante": 0},
        {"mandante": "Java United", "visitante": "JavaScript City", "gols_mandante": 0, "gols_visitante": 2},
        {"mandante": "Python FC", "visitante": "JavaScript City", "gols_mandante": 4, "gols_visitante": 1},
        {"mandante": "Java United", "visitante": "C++ Rovers", "gols_mandante": 1, "gols_visitante": 3},
        {"mandante": "JavaScript City", "visitante": "Python FC", "gols_mandante": 0, "gols_visitante": 2},
        {"mandante": "C++ Rovers", "visitante": "Java United", "gols_mandante": 1, "gols_visitante": 1},
        {"mandante": "JavaScript City", "visitante": "C++ Rovers", "gols_mandante": 3, "gols_visitante": 1},
        {"mandante": "Java United", "visitante": "Python FC", "gols_mandante": 2, "gols_visitante": 2},
        {"mandante": "JavaScript City", "visitante": "Java United", "gols_mandante": 1, "gols_visitante": 0},
        {"mandante": "C++ Rovers", "visitante": "Python FC", "gols_mandante": 0, "gols_visitante": 1}
    ]
}
```

## Sua missão

Construa um sistema completo de tabela de campeonato:

1. calcular_pontos(jogo, time) — dado um jogo e um nome de time, retorna 3 (vitória), 1 (empate) ou 0 (derrota).

2. gerar_tabela() — percorre TODOS os jogos e calcula para CADA time:
   pontos, vitórias, empates, derrotas, gols_pro, gols_contra, saldo

3. ordenar_tabela(tabela) — ordena por: pontos (desc), depois vitórias (desc), depois saldo de gols (desc).

4. imprimir_tabela(tabela) — imprime a tabela formatada.

5. artilheiro_time(nome) — encontra quantos gols o time fez como mandante vs visitante.

6. retrospecto(time1, time2) — mostra todos os jogos entre os dois times e o retrospecto geral.

Monte a tabela final e descubra quem é o campeão!

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
═══ TABELA — COPA SENAI ═══
Pos | Time               | P  | V | E | D | GP | GC | SG
1   | Python FC          | 16 | 5 | 1 | 0 | 13 |  6 | +7
2   | JavaScript City    | 10 | 3 | 1 | 2 |  9 |  8 | +1
3   | C++ Rovers         |  5 | 1 | 2 | 3 |  7 |  9 | -2
4   | Java United        |  2 | 0 | 2 | 4 |  5 | 11 | -6

🏆 Campeão: Python FC!

Retrospecto Python FC vs Java United:
Jogo 1: Python FC 3 x 1 Java United
Jogo 2: Java United 2 x 2 Python FC
Python FC: 1V 1E 0D
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Esse é o chefão! Mas a estratégia é a mesma: divida em partes menores. Comece pela função calcular_pontos — ela só olha um jogo e diz se um time ganhou (3 pts), empatou (1 pt) ou perdeu (0 pts).

</details>

<details>
<summary>Dica 2</summary>

Para gerar_tabela, o truque principal é: antes de olhar os jogos, prepare uma "ficha" para cada time com tudo zerado (pontos, vitórias, empates, derrotas, gols a favor, gols contra). Depois, passe por cada jogo e atualize as fichas. Atenção: cada jogo mexe em DOIS times — o mandante e o visitante.

</details>

<details>
<summary>Dica 3</summary>

Para saber quem ganhou um jogo: compare gols_mandante com gols_visitante. Se o mandante fez mais gols, ele ganhou (+3 pts) e o visitante perdeu. Se foi igual, empate (+1 pt cada). Some os gols a favor e contra de cada lado.

</details>

<details>
<summary>Dica 4</summary>

Para ordenar a tabela, o Python permite ordenar por mais de um critério ao mesmo tempo usando uma tupla. O primeiro da tabela é quem tem mais pontos; se empatar, quem tem mais vitórias; se empatar de novo, quem tem melhor saldo de gols. Use sorted() com reverse=True.

</details>

<details>
<summary>Dica extra</summary>

O segredo é inicializar um dict para cada time com todas as stats zeradas ANTES de percorrer os jogos. Cada jogo atualiza DOIS times (mandante e visitante). Use sorted() com key=lambda x: (x["pontos"], x["vitorias"], x["saldo"]) com reverse=True para critérios múltiplos de ordenação.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: sistema completo, atualizar dois registros por iteração, ordenação multi-critério, retrospecto.

Marque a prática como concluída quando conseguir explicar sua solução.
