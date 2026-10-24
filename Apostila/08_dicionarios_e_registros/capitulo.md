# Capítulo 8 — Dicionários e registros estruturados

Listas organizam valores por posição. Para representar um produto completo, porém, lembrar que o índice `0` é o nome, `1` é o preço e `2` é a quantidade torna o código frágil.

Dicionários organizam valores por chaves descritivas. Neste encontro, cada produto se tornará um registro com campos nomeados.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 8 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Dicionários, iteração e registros aninhados |
| Produto do encontro | Um catálogo formado por registros de produtos |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Copie os arquivos de `starter/` e abra a cópia no VS Code.

```text
starter/
├── chave_inexistente.py
└── produto_base.py
```

Você precisa reconhecer listas, laços, condicionais e funções simples.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- criar dicionários;
- acessar, adicionar e alterar pares chave–valor;
- verificar a existência de uma chave;
- usar `get()` para acesso seguro;
- remover valores;
- consultar `keys()`, `values()` e `items()`;
- percorrer dicionários;
- criar dicionários aninhados;
- processar uma lista de dicionários;
- diagnosticar `KeyError`.

## Chaves dão nome aos campos

```python
produto = {
    "nome": "Caderno",
    "preco": 8.50,
    "quantidade": 12,
    "ativo": True,
}
```

Cada par possui uma chave e um valor. As chaves acima são strings; os valores têm tipos diferentes porque representam campos diferentes do mesmo produto.

## Lista ou dicionário?

Use uma lista quando os valores têm o mesmo papel e a ordem importa:

```python
categorias = ["Papelaria", "Higiene", "Alimentos"]
```

Use um dicionário quando cada valor representa um campo nomeado de uma entidade:

```python
produto = {"nome": "Caderno", "preco": 8.50}
```

Para representar vários produtos, combine as duas estruturas: uma lista guarda os produtos, e cada produto é um dicionário.

## Acessando e alterando

```python
print(produto["nome"])
print(produto["quantidade"])
```

Saída:

```text
Caderno
12
```

Para alterar:

```python
produto["quantidade"] = 15
```

Para adicionar uma chave:

```python
produto["categoria"] = "Papelaria"
```

Uma atribuição com chave existente altera o valor. Com chave nova, adiciona o par.

## Verificando e acessando com segurança

```python
if "categoria" in produto:
    print(produto["categoria"])
```

`in` verifica as chaves do dicionário.

`get()` permite fornecer um valor padrão:

```python
localizacao = produto.get("localizacao", "Não informada")
print(localizacao)
```

Saída:

```text
Não informada
```

Se a chave não existir, o programa recebe `"Não informada"` em vez de produzir `KeyError`.

> **Dica:** use colchetes quando a chave é obrigatória e sua ausência representa um erro. Use `get()` quando existe um padrão aceitável.

## Removendo campos

```python
if "categoria" in produto:
    del produto["categoria"]
```

`del` remove o par. Para esvaziar um dicionário existente:

```python
produto.clear()
```

Não use `clear()` quando ainda precisa dos dados.

## Chaves, valores e pares

```python
print(produto.keys())
print(produto.values())
print(produto.items())
```

Para percorrer chaves:

```python
for chave in produto:
    print(chave)
```

Para percorrer pares:

```python
for chave, valor in produto.items():
    print(f"{chave}: {valor}")
```

`items()` entrega cada chave junto com seu valor.

Em cada repetição, ele entrega um par, como `("nome", "Caderno")`. Python desempacota esse par: o primeiro elemento vai para `chave` e o segundo para `valor`. É o mesmo princípio de distribuir dois valores entre dois nomes.

## Dicionários aninhados

Um valor pode ser outro dicionário:

```python
produto = {
    "nome": "Caderno",
    "fornecedor": {
        "nome": "Papel & Cia",
        "cidade": "Campinas",
    },
}

print(produto["fornecedor"]["cidade"])
```

Leia da esquerda para a direita: acesse o campo `fornecedor` e, dentro dele, o campo `cidade`.

## Lista de dicionários

Uma lista pode reunir vários registros:

```python
produtos = [
    {"nome": "Caderno", "preco": 8.50, "quantidade": 12},
    {"nome": "Caneta", "preco": 3.20, "quantidade": 5},
]

for produto in produtos:
    print(f"{produto['nome']}: {produto['quantidade']}")
```

Agora cada item carrega seus próprios campos. Não dependemos de duas listas paralelas.

### Calculando com registros

```python
valor_total = 0

for produto in produtos:
    valor_produto = produto["preco"] * produto["quantidade"]
    valor_total += valor_produto

print(f"Valor total: R$ {valor_total:.2f}")
```

## Prática acompanhada — Registro de produto

Abra `starter/produto_base.py`.

1. Exiba nome e quantidade.
2. Altere a quantidade para `15`.
3. Adicione categoria e localização.
4. Consulte fornecedor com `get()` e padrão `Não informado`.
5. Percorra todos os pares com `items()`.
6. Calcule o valor do estoque do produto.

Depois, acrescente um dicionário aninhado `fornecedor` com nome e cidade.

### Checklist

- [ ] O nome e a quantidade aparecem antes das alterações.
- [ ] A quantidade foi alterada para `15`.
- [ ] Categoria e localização foram adicionadas.
- [ ] `get()` mostrou `Não informado` antes da inclusão do fornecedor.
- [ ] O laço com `items()` exibiu todos os pares.
- [ ] O valor do estoque foi calculado com preço e quantidade.
- [ ] A cidade do fornecedor aninhado foi acessada.

> **Pausa sugerida:** este é um bom ponto para o intervalo.

## Oficina de depuração — Chave inexistente

Abra `starter/chave_inexistente.py`:

```python
produto = {"nome": "Caderno", "quantidade": 12}
print(produto["categoria"])
```

O acesso produz `KeyError: 'categoria'`.

Execute o programa uma vez e leia a última linha do traceback antes de alterar o código.

Investigue:

1. Quais chaves realmente existem?
2. A categoria é obrigatória ou opcional nesse exemplo?
3. Se for opcional, qual valor padrão faz sentido?
4. Corrija com `get()` e depois teste adicionando a chave.

## Exercício independente — Catálogo estruturado

Crie `catalogo_produtos.py` com pelo menos quatro dicionários dentro de uma lista. Cada produto terá:

- `nome`;
- `categoria`;
- `preco`;
- `quantidade`;
- `estoque_minimo`.

O programa deverá:

1. percorrer todos os produtos;
2. exibir os campos principais;
3. calcular o valor de cada item em estoque;
4. classificar como esgotado, crítico ou adequado;
5. somar o valor total do catálogo;
6. contar quantos produtos exigem reposição.

Não use arquivos, classes ou inteligência artificial.

### Dados sugeridos

```python
produtos = [
    {"nome": "Caderno", "categoria": "Papelaria", "preco": 8.50, "quantidade": 10, "estoque_minimo": 3},
    {"nome": "Caneta", "categoria": "Papelaria", "preco": 3.20, "quantidade": 0, "estoque_minimo": 5},
    {"nome": "Sabonete", "categoria": "Higiene", "preco": 4.00, "quantidade": 2, "estoque_minimo": 4},
    {"nome": "Café", "categoria": "Alimentos", "preco": 18.00, "quantidade": 6, "estoque_minimo": 2},
]
```

### Testes mínimos

Com os dados sugeridos, confirme:

| Verificação | Resultado esperado |
|---|---|
| `Caneta` | esgotado |
| `Sabonete` | crítico |
| `Caderno` e `Café` | adequado |
| Valor total do catálogo | `R$ 201.00` |
| Produtos para reposição | `2` |

<details>
<summary>Pista</summary>

Dentro do `for`, use `produto["campo"]`. Crie acumuladores antes do laço.

</details>

## Resumo do capítulo

- Dicionários armazenam pares chave–valor.
- Chaves nomeiam campos.
- Atribuição altera ou adiciona pares.
- `in` verifica chaves.
- `get()` permite um valor padrão.
- `del` remove um par.
- `keys()`, `values()` e `items()` oferecem visões do conteúdo.
- Dicionários podem ser aninhados.
- Uma lista de dicionários representa vários registros.

## Verifique seu aprendizado

1. Quando usar lista e quando usar dicionário?
2. O que acontece ao atribuir uma chave já existente?
3. Qual diferença existe entre colchetes e `get()`?
4. O que `in` verifica em um dicionário?
5. Para que serve `items()`?
6. Como acessar uma chave dentro de um dicionário aninhado?

## Tarefa de saída

Crie um dicionário para um produto com nome, preço e quantidade. Adicione categoria, altere quantidade, calcule o valor total e percorra os pares com `items()`.

### Critérios

- [ ] O dicionário possui os quatro campos pedidos.
- [ ] A nova quantidade aparece no cálculo.
- [ ] O laço exibe cada chave junto com seu valor.
- [ ] Consigo explicar quando usaria uma lista em vez de um dicionário.

## Vocabulário

| Termo | Significado |
|---|---|
| Dicionário | Coleção de pares chave–valor. |
| Chave | Identificador usado para acessar um valor. |
| Valor padrão | Resultado alternativo usado quando uma chave não existe. |
| Registro | Conjunto de campos relacionados a uma entidade. |
| Aninhamento | Estrutura armazenada dentro de outra. |
| `KeyError` | Erro de acesso a uma chave inexistente. |

## Referências e continuidade

- [Dicionários — tutorial oficial](https://docs.python.org/3/tutorial/datastructures.html#dictionaries)

No próximo capítulo, separaremos funções e dados em arquivos importáveis para organizar programas maiores.
