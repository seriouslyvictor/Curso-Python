# Capítulo 5 — Listas e coleções ordenadas

Até agora, cada variável guardou um único valor. Isso se torna desconfortável quando precisamos representar vários produtos: criar `produto_1`, `produto_2` e `produto_3` não oferece uma maneira simples de tratar o conjunto.

Neste encontro, usaremos listas para guardar valores em ordem, acessar posições e modificar uma coleção durante a execução.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 5 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Criação, acesso e alteração de listas |
| Produto do encontro | Uma coleção editável de produtos e categorias |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Copie os arquivos de `starter/` e abra a cópia no VS Code.

```text
starter/
├── indice_incorreto.py
└── lista_base.py
```

Você precisa saber usar variáveis, strings, `input()`, conversões simples, condicionais e o operador `in`.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- criar uma lista;
- explicar por que os índices começam em zero;
- acessar posições positivas e negativas;
- adicionar, inserir, alterar e remover itens;
- usar `in` e `len()` com listas;
- ordenar e inverter uma coleção;
- diferenciar métodos que alteram a lista de funções que apenas consultam valores;
- investigar um `IndexError`.

## Criando uma lista

Uma lista reúne vários valores entre colchetes:

```python
produtos = ["Caderno", "Caneta", "Borracha"]
print(produtos)
```

Saída:

```text
['Caderno', 'Caneta', 'Borracha']
```

Os itens são separados por vírgulas e mantêm uma ordem. Uma lista pode começar vazia:

```python
produtos = []
```

Embora Python permita misturar tipos, coleções com valores do mesmo propósito costumam ser mais fáceis de compreender:

```python
quantidades = [12, 8, 20]
```

## Índices começam em zero

Cada posição possui um índice:

```text
Valor:   Caderno    Caneta    Borracha
Índice:      0         1          2
```

```python
produtos = ["Caderno", "Caneta", "Borracha"]
print(produtos[0])
print(produtos[1])
```

Saída:

```text
Caderno
Caneta
```

O índice `-1` acessa o último item:

```python
print(produtos[-1])
```

Saída:

```text
Borracha
```

> **Erro comum:** usar `1` para acessar o primeiro item. Em Python, o primeiro índice é `0`.

## Listas são mutáveis

Mutável significa que a coleção pode ser alterada depois de criada.

### Adicionando ao final com `append()`

```python
produtos = ["Caderno", "Caneta"]
produtos.append("Borracha")
print(produtos)
```

Saída:

```text
['Caderno', 'Caneta', 'Borracha']
```

### Inserindo em uma posição com `insert()`

```python
produtos.insert(1, "Lápis")
print(produtos)
```

O item é inserido no índice `1`; os seguintes são deslocados.

### Alterando uma posição

```python
produtos[0] = "Caderno universitário"
```

### Removendo pelo valor

```python
produtos.remove("Caneta")
```

`remove()` apaga a primeira ocorrência encontrada. Se o valor não existir, Python apresenta `ValueError`. Podemos verificar antes:

```python
if "Caneta" in produtos:
    produtos.remove("Caneta")
else:
    print("Produto não encontrado.")
```

## Consultando uma coleção

`in` verifica se um valor pertence à lista:

```python
print("Lápis" in produtos)
```

`len()` informa quantos itens existem:

```python
print(f"Itens cadastrados: {len(produtos)}")
```

Uma lista vazia possui tamanho zero.

> **Teste mental:** uma lista com três itens possui qual último índice? Compare esse índice com `len(lista)`.

## Ordenando e invertendo

`sort()` altera a lista para uma ordem crescente:

```python
categorias = ["Limpeza", "Alimentos", "Papelaria"]
categorias.sort()
print(categorias)
```

Saída:

```text
['Alimentos', 'Limpeza', 'Papelaria']
```

`reverse()` inverte a ordem atual:

```python
categorias.reverse()
```

Para números, `sort()` usa a ordem numérica:

```python
quantidades = [25, 4, 18, 10]
quantidades.sort()
print(quantidades)
```

Saída:

```text
[4, 10, 18, 25]
```

> **Atenção:** `sort()` e `reverse()` modificam a lista. Eles não produzem uma nova coleção neste uso.

## Prática acompanhada — Organizando produtos

Abra `starter/lista_base.py`.

1. Exiba a lista inicial e seu tamanho.
2. Adicione `Borracha` com `append()`.
3. Insira `Lápis` no índice `1`.
4. Troque `Caderno` por `Caderno universitário`.
5. Verifique se `Caneta` existe antes de removê-la.
6. Ordene a lista.
7. Exiba o primeiro item, o último item e a coleção final.

Resultado final esperado:

```text
['Borracha', 'Caderno universitário', 'Lápis']
```

### Checklist

- [ ] A lista começou com os dados fornecidos.
- [ ] Cada método foi executado uma vez.
- [ ] A remoção foi protegida com `if`.
- [ ] O primeiro e o último item foram acessados corretamente.
- [ ] O tamanho final é `3`.

> **Pausa sugerida:** este é um bom ponto para o intervalo.

## Oficina de depuração — Índice inexistente

Abra `starter/indice_incorreto.py`:

```python
produtos = ["Caderno", "Caneta", "Borracha"]
print(f"Quantidade de produtos: {len(produtos)}")
print(f"Último produto: {produtos[3]}")
```

O tamanho é `3`, mas os índices válidos são `0`, `1` e `2`. O acesso ao índice `3` produz `IndexError`.

Investigue:

1. Qual linha o traceback indica?
2. Quais índices existem?
3. Como acessar o último item sem calcular o índice?
4. Por que `len(produtos)` não é um índice válido dessa lista?

A correção está separada em `solucao/`.

## Exercício independente — Preparação de catálogo

Crie `preparar_catalogo.py`.

O programa deverá:

1. começar com `produtos = ["Caderno", "Caneta", "Borracha"]`;
2. perguntar o nome de um novo produto e adicioná-lo;
3. perguntar um produto para remoção;
4. remover somente se ele existir;
5. informar quando a remoção não for possível;
6. ordenar a lista;
7. exibir a quantidade, o primeiro item, o último item e a lista final.

Use apenas recursos estudados até este capítulo. Não use laços ou funções e não use inteligência artificial.

### Testes mínimos

| Novo produto | Remoção | Resultado esperado |
|---|---|---|
| `Lápis` | `Caneta` | Lista final sem `Caneta` |
| `Régua` | `Tesoura` | Mensagem de não encontrado |

### Pistas

<details>
<summary>Pista 1</summary>

Use `append()` imediatamente depois de receber o novo produto.

</details>

<details>
<summary>Pista 2</summary>

Coloque `remove()` dentro de um `if produto_remover in produtos`.

</details>

## Resumo do capítulo

- Listas guardam vários valores em ordem.
- Índices começam em zero.
- `-1` acessa o último item.
- Listas são mutáveis.
- `append()` adiciona ao final e `insert()` adiciona em uma posição.
- Uma posição pode ser alterada por atribuição.
- `remove()` apaga pelo valor.
- `in` verifica pertencimento e `len()` informa o tamanho.
- `sort()` ordena e `reverse()` inverte a própria lista.

## Verifique seu aprendizado

1. Quais são os índices de uma lista com quatro itens?
2. Qual diferença existe entre `append()` e `insert()`?
3. O que acontece ao acessar um índice inexistente?
4. Como remover um valor sem provocar `ValueError` quando ele não existe?
5. `sort()` cria outra lista ou altera a existente?
6. Por que `lista[len(lista)]` é inválido para uma lista não vazia?

## Tarefa de saída

Crie `categorias.py` com três categorias iniciais. Receba uma quarta categoria, adicione-a, ordene a lista e exiba a quantidade e o resultado final.

### Critérios

- [ ] A coleção possui quatro itens após a entrada.
- [ ] A lista aparece em ordem alfabética.
- [ ] O tamanho exibido confere com a coleção.
- [ ] Consigo explicar o índice do primeiro e do último item.

## Vocabulário

| Termo | Significado |
|---|---|
| Lista | Coleção ordenada e mutável. |
| Item | Valor armazenado em uma coleção. |
| Índice | Número que identifica uma posição. |
| Mutável | Que pode ser alterado depois da criação. |
| Método | Operação chamada a partir de um valor, como `produtos.append()`. |
| `IndexError` | Erro causado pelo acesso a uma posição inexistente. |

## Referências e continuidade

- [Listas — tutorial oficial do Python](https://docs.python.org/3/tutorial/introduction.html#lists)
- [Métodos de listas](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists)

No próximo capítulo, usaremos laços para processar todos os itens de uma lista sem repetir manualmente as mesmas instruções.
