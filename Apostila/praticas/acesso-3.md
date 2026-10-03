## Antes de começar

Pratique acesso profundo, operações matemáticas, f-string com formatação com dados inspirados em API de Futebol. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "jogador": {
        "nome": "Neymar Jr.",
        "idade": 33,
        "posicao": "Atacante",
        "clube": {
            "nome": "Santos FC",
            "pais": "Brasil",
            "estadio": "Vila Belmiro"
        },
        "estatisticas": {
            "gols": 440,
            "assistencias": 258,
            "jogos": 716
        }
    }
}
```

## Sua missão

Imprima:
- O nome do jogador
- O nome do estádio do clube
- A média de gols por jogo (gols / jogos), com 2 casas decimais
- A frase: "Neymar Jr. jogou 716 partidas pelo(s) clube(s)"

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Neymar Jr.
Vila Belmiro
0.61
Neymar Jr. jogou 716 partidas pelo(s) clube(s)
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Imagine que os dados são pastas dentro de pastas. Para chegar no estádio, você precisa abrir a pasta "jogador", depois a pasta "clube", e aí sim encontrar "estadio".

</details>

<details>
<summary>Dica 2</summary>

Para a média de gols por jogo, é uma divisão simples: gols dividido por jogos. O resultado vai ter muitas casas decimais — você vai precisar dizer ao Python para mostrar só duas.

</details>

<details>
<summary>Dica 3</summary>

O caminho completo para o estádio é dados["jogador"]["clube"]["estadio"]. Para mostrar a média com 2 casas, use :.2f dentro da f-string — por exemplo: f"{media:.2f}".

</details>

<details>
<summary>Dica extra</summary>

Para a média, divida gols por jogos e use :.2f na f-string. O caminho pro estádio é: dados → jogador → clube → estadio.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: acesso profundo, operações matemáticas, f-string com formatação.

Marque a prática como concluída quando conseguir explicar sua solução.
