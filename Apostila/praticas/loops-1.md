## Antes de começar

Pratique for loop, acumulador, len(), f-string com dados inspirados em API de Músicas. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "playlist": "Top Brasil",
    "musicas": [
        {"titulo": "Evidências", "artista": "Chitãozinho & Xororó", "plays": 890000},
        {"titulo": "Aquarela", "artista": "Toquinho", "plays": 750000},
        {"titulo": "Ai Se Eu Te Pego", "artista": "Michel Teló", "plays": 2100000},
        {"titulo": "Garota de Ipanema", "artista": "Tom Jobim", "plays": 3200000},
        {"titulo": "Trem-Bala", "artista": "Ana Vilela", "plays": 1800000}
    ]
}
```

## Sua missão

1. Imprima o nome de cada música e seu artista no formato:
   "Evidências - Chitãozinho & Xororó"

2. Calcule e imprima o total de plays da playlist.

3. Calcule e imprima a média de plays por música.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Evidências - Chitãozinho & Xororó
Aquarela - Toquinho
Ai Se Eu Te Pego - Michel Teló
Garota de Ipanema - Tom Jobim
Trem-Bala - Ana Vilela
Total de plays: 8740000
Média de plays: 1748000.0
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Você tem uma lista de músicas. Precisa passar por cada uma, como se estivesse folheando um álbum de figurinhas — olhando uma por uma. Em Python, o "for" faz exatamente isso.

</details>

<details>
<summary>Dica 2</summary>

Para somar todos os plays, pense numa calculadora: comece do zero e vá somando o valor de cada música. Crie uma variável antes do loop (ex: total = 0) e dentro do loop vá adicionando.

</details>

<details>
<summary>Dica 3</summary>

Dentro do for, cada música é um dicionário. Acesse com musica["titulo"] e musica["plays"]. Para a média, depois do loop, divida o total pelo número de músicas — use len() para contar quantas tem na lista.

</details>

<details>
<summary>Dica extra</summary>

Para o total, use o padrão acumulador (total = 0, depois total += ...). Para a média, divida o total por len(dados["musicas"]).

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: for loop, acumulador, len(), f-string.

Marque a prática como concluída quando conseguir explicar sua solução.
