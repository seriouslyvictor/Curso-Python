## Antes de começar

Pratique acesso a chaves, lista dentro de dict, acesso aninhado com dados inspirados em PokéAPI. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "name": "charizard",
    "id": 6,
    "height": 17,
    "weight": 905,
    "base_experience": 267,
    "types": [
        {"slot": 1, "type": {"name": "fire"}},
        {"slot": 2, "type": {"name": "flying"}}
    ]
}
```

## Sua missão

Imprima as seguintes informações:
- Nome do Pokémon
- Peso
- Experiência base
- Nome do primeiro tipo (ex: "fire")
- Nome do segundo tipo (ex: "flying")

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
charizard
905
267
fire
flying
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Pense no dicionário como uma ficha cadastral: cada informação tem uma etiqueta (a chave). Para ler o nome, basta "abrir a gaveta" certa com dados["nome_da_chave"].

</details>

<details>
<summary>Dica 2</summary>

As primeiras três informações (nome, peso, experiência) estão na "camada de fora" do dicionário — é só acessar direto. Já os tipos estão guardados dentro de uma lista, como uma pasta com várias fichas dentro.

</details>

<details>
<summary>Dica 3</summary>

"types" é uma lista com dois itens. Para pegar o primeiro, use [0]. Mas cada item dessa lista também é um dicionário — então depois do [0] você ainda precisa entrar em mais uma "gaveta" para chegar no nome do tipo.

</details>

<details>
<summary>Dica extra</summary>

Lembre: "types" é uma lista. Para acessar o primeiro item use [0], depois navegue nas chaves internas.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: acesso a chaves, lista dentro de dict, acesso aninhado.

Marque a prática como concluída quando conseguir explicar sua solução.
