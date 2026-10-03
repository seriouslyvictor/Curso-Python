## Antes de começar

Pratique booleanos, round / formatação, acesso aninhado com dados inspirados em API de Rede Social. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "user": {
        "username": "python_dev_br",
        "display_name": "Dev Brasil 🇧🇷",
        "followers_count": 12450,
        "following_count": 892,
        "bio": "Aprendendo Python no SENAI",
        "verified": False,
        "created_at": "2023-03-15",
        "pinned_post": {
            "text": "Primeiro código em Python!",
            "likes": 342,
            "reposts": 28
        }
    }
}
```

## Sua missão

Imprima:
- O username
- Se o usuário é verificado (True/False)
- O texto do post fixado
- A proporção seguidores/seguindo (followers / following), arredondada para 1 casa decimal
- A frase: "@python_dev_br tem 12450 seguidores"

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
python_dev_br
False
Primeiro código em Python!
14.0
@python_dev_br tem 12450 seguidores
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Olhe o dicionário como um perfil de rede social. Cada informação tem seu "campo". Comece pelos mais fáceis: username e verified estão logo ali dentro de "user".

</details>

<details>
<summary>Dica 2</summary>

O post fixado está "escondido" um nível mais fundo — é um dicionário dentro de outro. Para a proporção, pense: se alguém tem 100 seguidores e segue 10, a proporção é 100 / 10 = 10.0.

</details>

<details>
<summary>Dica 3</summary>

Para arredondar, você pode usar round(valor, 1) ou formatar com :.1f. O post fixado está em dados["user"]["pinned_post"]["text"]. Na f-string, o @ é só texto normal: f"@{username} tem ...".

</details>

<details>
<summary>Dica extra</summary>

Use round(valor, 1) ou :.1f para a proporção. Para o @, é só concatenar na f-string.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: booleanos, round / formatação, acesso aninhado.

Marque a prática como concluída quando conseguir explicar sua solução.
