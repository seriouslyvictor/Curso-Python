## Antes de começar

Pratique for + if, booleano como filtro, múltiplas condições, separar listas com dados inspirados em PokéAPI. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "pokemon_list": [
        {"name": "pikachu", "type": "electric", "hp": 35, "attack": 55, "legendary": False},
        {"name": "charizard", "type": "fire", "hp": 78, "attack": 84, "legendary": False},
        {"name": "mewtwo", "type": "psychic", "hp": 106, "attack": 110, "legendary": True},
        {"name": "bulbasaur", "type": "grass", "hp": 45, "attack": 49, "legendary": False},
        {"name": "rayquaza", "type": "dragon", "hp": 105, "attack": 150, "legendary": True},
        {"name": "jigglypuff", "type": "fairy", "hp": 115, "attack": 45, "legendary": False},
        {"name": "gengar", "type": "ghost", "hp": 60, "attack": 65, "legendary": False},
        {"name": "lugia", "type": "psychic", "hp": 106, "attack": 90, "legendary": True}
    ]
}
```

## Sua missão

1. Imprima apenas os Pokémon lendários.

2. Imprima os Pokémon com HP maior que 100.

3. Imprima os Pokémon NÃO-lendários que têm ataque maior que 60.

4. Separe os Pokémon em duas listas: "fortes" (attack >= 80) e "fracos" (attack < 80). Imprima cada lista.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Lendários: mewtwo, rayquaza, lugia

HP > 100: mewtwo, rayquaza, jigglypuff, lugia

Não-lendários fortes: charizard, gengar
(gengar tem attack 65, não entra — só charizard)

Fortes: charizard, mewtwo, rayquaza, lugia
Fracos: pikachu, bulbasaur, jigglypuff, gengar
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Pense no "if" dentro do "for" como um porteiro: ele olha cada Pokémon e só deixa passar quem atende à condição. Comece com a tarefa mais simples — imprimir só os lendários.

</details>

<details>
<summary>Dica 2</summary>

"legendary" é True ou False. Você não precisa escrever == True — basta usar: if pokemon["legendary"]. Para combinar duas condições (ex: não é lendário E tem ataque alto), use "and" para juntar as duas perguntas.

</details>

<details>
<summary>Dica 3</summary>

Para separar em duas listas, crie fortes = [] e fracos = [] antes do loop. Dentro do loop, use if/else para decidir em qual lista colocar cada Pokémon com .append(). No final, imprima as duas listas.

</details>

<details>
<summary>Dica extra</summary>

Combine o for com if. Para separar em duas listas, crie duas listas vazias antes do loop e use .append() com a condição.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: for + if, booleano como filtro, múltiplas condições, separar listas.

Marque a prática como concluída quando conseguir explicar sua solução.
