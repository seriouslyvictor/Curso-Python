## Antes de começar

Pratique criar dict novo, split(), min/max, contagem de frequência com dados inspirados em OpenWeather. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "list": [
        {"dt_txt": "2024-08-01 09:00:00", "main": {"temp": 18.5, "humidity": 72}, "weather": [{"description": "chuva leve"}]},
        {"dt_txt": "2024-08-01 12:00:00", "main": {"temp": 22.3, "humidity": 65}, "weather": [{"description": "nublado"}]},
        {"dt_txt": "2024-08-01 15:00:00", "main": {"temp": 25.1, "humidity": 58}, "weather": [{"description": "céu limpo"}]},
        {"dt_txt": "2024-08-01 18:00:00", "main": {"temp": 21.0, "humidity": 70}, "weather": [{"description": "nublado"}]},
        {"dt_txt": "2024-08-01 21:00:00", "main": {"temp": 17.8, "humidity": 80}, "weather": [{"description": "chuva leve"}]}
    ]
}
```

## Sua missão

1. Crie uma lista simplificada com apenas hora, temperatura e descrição:
   [{"hora": "09:00", "temp": 18.5, "clima": "chuva leve"}, ...]

2. Encontre a temperatura máxima e mínima do dia.

3. Calcule a temperatura média do dia.

4. Crie um dict resumo_dia com: temp_max, temp_min, temp_media, descricao_mais_comum.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Lista simplificada:
[{"hora": "09:00", "temp": 18.5, "clima": "chuva leve"}, ...]

Máxima: 25.1°C | Mínima: 17.8°C
Média: 20.94°C

Resumo:
{"temp_max": 25.1, "temp_min": 17.8, "temp_media": 20.94, "clima_frequente": "nublado"}
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Para a hora, use split() na string "2024-08-01 09:00:00" → .split(" ")[1][:5]. Para descrição mais comum, conte ocorrências com um dict.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: criar dict novo, split(), min/max, contagem de frequência.

Marque a prática como concluída quando conseguir explicar sua solução.
