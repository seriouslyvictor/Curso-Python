## Antes de começar

Pratique acesso aninhado, f-string, lista com um item com dados inspirados em OpenWeather. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "coord": {"lon": -46.63, "lat": -23.55},
    "weather": [
        {"id": 802, "main": "Clouds", "description": "nublado"}
    ],
    "main": {
        "temp": 22.5,
        "feels_like": 23.1,
        "temp_min": 19.0,
        "temp_max": 27.0,
        "humidity": 68
    },
    "wind": {"speed": 3.5},
    "name": "São Paulo"
}
```

## Sua missão

Usando os dados, monte e imprima a seguinte frase:

"São Paulo: 22.5°C (sensação de 23.1°C), nublado, umidade 68%"

Use f-string para formatar.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
São Paulo: 22.5°C (sensação de 23.1°C), nublado, umidade 68%
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

A ideia é juntar vários pedaços de informação numa frase só. Primeiro, descubra onde cada pedaço mora dentro do dicionário — alguns estão mais "escondidos" que outros.

</details>

<details>
<summary>Dica 2</summary>

Tente guardar cada valor numa variável separada (ex: cidade = dados["name"]). Isso facilita na hora de montar a frase. Lembre que dentro de "main" tem vários valores, e "weather" funciona diferente dos outros...

</details>

<details>
<summary>Dica 3</summary>

"weather" é uma lista (repare nos colchetes []), então mesmo tendo só um item, você precisa usar [0] para entrar nele. Depois, use uma f-string para colar tudo: f"{cidade}: {temp}°C ...".

</details>

<details>
<summary>Dica extra</summary>

Extraia cada valor em uma variável separada antes de montar a f-string. "weather" é uma lista — precisa do [0].

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: acesso aninhado, f-string, lista com um item.

Marque a prática como concluída quando conseguir explicar sua solução.
