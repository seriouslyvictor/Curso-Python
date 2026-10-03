## Antes de começar

Pratique sorted() com lambda, engajamento calculado, contagem com dict, top N com dados inspirados em API de Notícias. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "feed": [
        {"titulo": "Python 4.0 anunciado", "categoria": "tech", "likes": 1200, "comentarios": 89, "autor": "TechBR"},
        {"titulo": "Receita de bolo de cenoura", "categoria": "culinaria", "likes": 450, "comentarios": 34, "autor": "ChefMaria"},
        {"titulo": "Novo jogo da Nintendo", "categoria": "games", "likes": 3400, "comentarios": 567, "autor": "GameOver"},
        {"titulo": "Dicas de investimento", "categoria": "financas", "likes": 890, "comentarios": 120, "autor": "FinBR"},
        {"titulo": "React vs Vue em 2024", "categoria": "tech", "likes": 670, "comentarios": 203, "autor": "DevBlog"},
        {"titulo": "Top 10 animes do ano", "categoria": "entretenimento", "likes": 5600, "comentarios": 890, "autor": "OtakuNews"},
        {"titulo": "Bug crítico no Linux", "categoria": "tech", "likes": 2100, "comentarios": 445, "autor": "TechBR"},
        {"titulo": "Treino para iniciantes", "categoria": "saude", "likes": 320, "comentarios": 45, "autor": "FitBR"}
    ]
}
```

## Sua missão

1. Filtre e imprima apenas notícias de "tech".

2. Imprima as notícias com mais de 1000 likes, ordenadas do mais curtido ao menos curtido (use sorted()).

3. Calcule o "engajamento" de cada post (likes + comentários) e imprima o top 3.

4. Conte quantos posts cada autor tem e imprima.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Tech: Python 4.0 anunciado, React vs Vue em 2024, Bug crítico no Linux

Populares (>1000 likes):
Top 10 animes do ano - 5600 likes
Novo jogo da Nintendo - 3400 likes
Bug crítico no Linux - 2100 likes
Python 4.0 anunciado - 1200 likes

Top 3 engajamento:
1. Top 10 animes do ano - 6490
2. Novo jogo da Nintendo - 3967
3. Bug crítico no Linux - 2545

Posts por autor:
TechBR: 2
ChefMaria: 1
...
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Esse exercício tem quatro mini-tarefas. Comece pela mais fácil: filtrar por categoria. Para cada notícia, pergunte: "a categoria é tech?" Se sim, guarde ou imprima.

</details>

<details>
<summary>Dica 2</summary>

Para ordenar, o Python tem uma ferramenta chamada sorted() que coloca uma lista em ordem. Você pode dizer POR QUE critério quer ordenar — nesse caso, por número de likes, do maior para o menor. O engajamento é só a soma de likes + comentários de cada post.

</details>

<details>
<summary>Dica 3</summary>

sorted() funciona assim: sorted(lista, key=lambda x: x["likes"], reverse=True). "reverse=True" faz ir do maior para o menor. Para contar posts por autor, crie um dicionário vazio e, para cada post, use .get(autor, 0) + 1 para ir contando.

</details>

<details>
<summary>Dica extra</summary>

Para sorted(), use o parâmetro key: sorted(lista, key=lambda x: x["likes"], reverse=True). Para contar por autor, crie um dict e use .get() para inicializar.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: sorted() com lambda, engajamento calculado, contagem com dict, top N.

Marque a prática como concluída quando conseguir explicar sua solução.
