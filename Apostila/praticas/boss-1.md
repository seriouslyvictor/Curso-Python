## Antes de começar

Pratique funções compostas, set para exclusão, sorted com lambda, relatório formatado com dados inspirados em API de Streaming. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "plataforma": "StreamBR",
    "usuarios": [
        {
            "nome": "Ana",
            "plano": "premium",
            "historico": [
                {"titulo": "Breaking Bad", "tipo": "serie", "episodios_assistidos": 62, "nota": 9.5},
                {"titulo": "O Poderoso Chefão", "tipo": "filme", "episodios_assistidos": 1, "nota": 9.0},
                {"titulo": "Friends", "tipo": "serie", "episodios_assistidos": 45, "nota": 7.5}
            ]
        },
        {
            "nome": "Bruno",
            "plano": "basico",
            "historico": [
                {"titulo": "Stranger Things", "tipo": "serie", "episodios_assistidos": 34, "nota": 8.5},
                {"titulo": "Matrix", "tipo": "filme", "episodios_assistidos": 1, "nota": 8.0}
            ]
        },
        {
            "nome": "Carla",
            "plano": "premium",
            "historico": [
                {"titulo": "Breaking Bad", "tipo": "serie", "episodios_assistidos": 62, "nota": 10.0},
                {"titulo": "Dark", "tipo": "serie", "episodios_assistidos": 26, "nota": 9.0},
                {"titulo": "Interestelar", "tipo": "filme", "episodios_assistidos": 1, "nota": 9.5},
                {"titulo": "Friends", "tipo": "serie", "episodios_assistidos": 100, "nota": 6.0}
            ]
        },
        {
            "nome": "Diego",
            "plano": "basico",
            "historico": [
                {"titulo": "The Office", "tipo": "serie", "episodios_assistidos": 50, "nota": 9.0},
                {"titulo": "Interestelar", "tipo": "filme", "episodios_assistidos": 1, "nota": 9.0},
                {"titulo": "Dark", "tipo": "serie", "episodios_assistidos": 26, "nota": 8.0},
                {"titulo": "Matrix", "tipo": "filme", "episodios_assistidos": 1, "nota": 7.5},
                {"titulo": "Stranger Things", "tipo": "serie", "episodios_assistidos": 10, "nota": 7.0}
            ]
        }
    ]
}
```

## Sua missão

Crie um mini sistema de análise com as seguintes funções:

1. total_episodios(usuario) — retorna o total de episódios assistidos por um usuário.

2. nota_media(usuario) — retorna a nota média das avaliações do usuário.

3. conteudo_mais_popular() — encontra qual título aparece no histórico de mais usuários.

4. ranking_usuarios() — retorna os usuários ordenados por total de episódios (do maior para menor).

5. recomendacao(nome_usuario) — encontra títulos que OUTROS usuários assistiram mas este NÃO, filtrando apenas os com nota >= 8.5.

6. relatorio_geral() — imprime um relatório completo com todas as análises.

BÔNUS: Separe a análise entre usuários "premium" e "basico".

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
═══════════════════════════════
   RELATÓRIO STREAMBR
═══════════════════════════════

📊 Ranking por episódios:
1. Carla — 189 episódios (premium)
2. Ana — 108 episódios (premium)
3. Diego — 91 episódios (basico)
4. Bruno — 35 episódios (basico)

⭐ Notas médias:
Ana: 8.67 | Bruno: 8.25 | Carla: 8.63 | Diego: 7.83

🏆 Conteúdo mais popular: Breaking Bad (2 usuários)

💡 Recomendações para Bruno:
- Breaking Bad (nota média: 9.75)
- Dark (nota: 9.0)
- O Poderoso Chefão (nota: 9.0)
- The Office (nota: 9.0)
- Interestelar (nota: 9.5)

Premium vs Básico:
Média de episódios premium: 148.5
Média de episódios básico: 63.0
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

Esse desafio parece grande, mas é como montar um quebra-cabeça: peça por peça. Comece pelas funções pequenas (total_episodios, nota_media) e só depois passe para as mais complexas. Teste cada uma separadamente antes de juntar.

</details>

<details>
<summary>Dica 2</summary>

Para total_episodios, percorra o histórico do usuário somando os episódios. Para nota_media, some todas as notas e divida pela quantidade. Para conteudo_mais_popular, a ideia é: para cada título, conte em quantos históricos de usuários ele aparece — o que aparece mais vezes é o mais popular.

</details>

<details>
<summary>Dica 3</summary>

A recomendação funciona assim: primeiro, faça uma lista de tudo que o usuário JÁ assistiu. Depois, percorra os outros usuários e veja o que eles assistiram que NÃO está na lista do primeiro — mas só pegue os que têm nota boa (>= 8.5). Para o ranking, use sorted() nos usuários comparando pelo total de episódios.

</details>

<details>
<summary>Dica 4</summary>

Para o bônus premium vs básico: separe os usuários em dois grupos pelo plano, calcule o total de episódios de cada grupo e divida pela quantidade de pessoas. O relatorio_geral() é só uma função que chama todas as outras e imprime tudo de forma organizada.

</details>

<details>
<summary>Dica extra</summary>

Quebre o problema! Faça uma função de cada vez, teste, e depois combine no relatorio_geral(). Para recomendação: pegue todos os títulos, remova os que o usuário já viu, filtre por nota.

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: funções compostas, set para exclusão, sorted com lambda, relatório formatado.

Marque a prática como concluída quando conseguir explicar sua solução.
