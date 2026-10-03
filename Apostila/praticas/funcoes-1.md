## Antes de começar

Pratique def / return, None como retorno, max() com key, funções que chamam funções com dados inspirados em PokéAPI. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
pokedex = [
    {"name": "pikachu", "type": "electric", "hp": 35, "attack": 55},
    {"name": "charizard", "type": "fire", "hp": 78, "attack": 84},
    {"name": "mewtwo", "type": "psychic", "hp": 106, "attack": 110},
    {"name": "bulbasaur", "type": "grass", "hp": 45, "attack": 49},
    {"name": "gengar", "type": "ghost", "hp": 60, "attack": 65},
    {"name": "lugia", "type": "psychic", "hp": 106, "attack": 90}
]
```

## Sua missão

Crie as seguintes funções:

1. buscar_pokemon(nome) — recebe um nome e retorna o dict do pokémon, ou None se não existir.

2. filtrar_por_tipo(tipo) — retorna uma lista com todos os pokémon daquele tipo.

3. mais_forte(stat) — recebe "hp" ou "attack" e retorna o pokémon com o maior valor naquela stat.

4. comparar(nome1, nome2) — imprime uma comparação lado a lado dos dois pokémon.

Teste todas as funções com chamadas de exemplo.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
buscar_pokemon("pikachu")
→ {"name": "pikachu", "type": "electric", "hp": 35, "attack": 55}

buscar_pokemon("dragonite")
→ None

filtrar_por_tipo("psychic")
→ [mewtwo, lugia]

mais_forte("attack")
→ mewtwo (110)

comparar("pikachu", "charizard")
→ pikachu: HP 35, ATK 55
→ charizard: HP 78, ATK 84
→ Vencedor em HP: charizard
→ Vencedor em ATK: charizard
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Uma função é como uma "máquina" que recebe algo (a entrada), faz alguma coisa com aquilo, e devolve um resultado. Comece pela mais simples: buscar_pokemon. Ela recebe um nome, percorre a lista e devolve o Pokémon certo.

</details>

<details>
<summary>Dica 2</summary>

Para buscar_pokemon: use um for para percorrer a lista e, se o nome bater, devolva aquele Pokémon. Se o for terminar sem achar nada, devolva None (que é o jeito do Python de dizer "não encontrei"). Para filtrar_por_tipo, é parecido mas você junta os resultados numa lista em vez de parar no primeiro.

</details>

<details>
<summary>Dica 3</summary>

Para mais_forte, o Python tem uma ferramenta que acha o maior valor numa lista. Para comparar, uma boa ideia é reaproveitar a função buscar_pokemon que você já criou — chame ela de dentro da função comparar para pegar os dados de cada Pokémon.

</details>

<details>
<summary>Dica extra</summary>

Use for + if + return para buscar_pokemon. Para mais_forte, use max() com key=lambda. Para comparar, chame buscar_pokemon() dentro da função.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: def / return, None como retorno, max() com key, funções que chamam funções.

Marque a prática como concluída quando conseguir explicar sua solução.
