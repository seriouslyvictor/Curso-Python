# Capítulo 4 — Decisões e regras de validação

Até agora, nossos programas executaram todas as instruções na mesma ordem. Eles calculam e exibem resultados, mas não conseguem escolher um comportamento diferente quando um valor é inválido, um produto está esgotado ou o estoque precisa de reposição.

Neste encontro, vamos usar condições para criar caminhos diferentes. O programa aprenderá a comparar valores, combinar regras e executar somente o bloco adequado para cada situação.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 4 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Condicionais, comparações e lógica booleana |
| Produto do encontro | Um validador de disponibilidade e nível de estoque |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Você não precisa recuperar arquivos de outros encontros.

### O que você já precisa saber

- usar variáveis, `input()` e f-strings;
- converter entradas com `int()` e `float()`;
- reconhecer `str`, `int`, `float` e `bool`;
- realizar cálculos simples;
- comparar uma saída observada com a saída esperada.

### Arquivos iniciais

```text
starter/
├── classificacao_incorreta.py
└── validador_base.py
```

Copie a pasta `starter/` para um local em que você possa editar os arquivos. Abra a cópia no VS Code.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- explicar como uma comparação produz `True` ou `False`;
- usar `if`, `elif` e `else`;
- criar blocos de código com indentação correta;
- combinar condições com `and`, `or` e `not`;
- verificar pertencimento com `in`;
- validar preço e quantidade;
- ordenar condições do caso mais específico para o mais geral;
- diagnosticar uma classificação incorreta causada pela ordem das condições.

## Situação-problema

Um sistema de estoque não deve aceitar qualquer valor sem análise. Antes de apresentar um produto como disponível, ele precisa responder perguntas como:

- O preço é maior que zero?
- A quantidade é válida?
- Ainda existem unidades disponíveis?
- A quantidade chegou ao nível mínimo?
- O produto está marcado como ativo?

Uma execução possível será:

```text
Produto: Caderno
Preço: 8.50
Quantidade atual: 4
Estoque mínimo: 5

Caderno: estoque crítico.
```

## Comparações produzem booleanos

Uma comparação responde a uma pergunta com `True` ou `False`.

```python
quantidade = 8

print(quantidade > 0)
print(quantidade == 8)
print(quantidade < 5)
```

Saída:

```text
True
True
False
```

### Operadores de comparação

| Operador | Pergunta | Exemplo |
|---|---|---|
| `==` | É igual? | `quantidade == 0` |
| `!=` | É diferente? | `status != "inativo"` |
| `>` | É maior? | `preco > 0` |
| `<` | É menor? | `quantidade < minimo` |
| `>=` | É maior ou igual? | `quantidade >= minimo` |
| `<=` | É menor ou igual? | `quantidade <= minimo` |

### `=` não é `==`

```python
quantidade = 8
```

Um sinal `=` atribui um valor.

```python
quantidade == 8
```

Dois sinais `==` comparam valores.

> **Erro comum:** usar `=` quando a intenção é comparar. Dentro de uma condição simples, isso produz um erro de sintaxe em vez de responder `True` ou `False`.

### Comparando strings

Strings também podem ser comparadas:

```python
status = "ativo"
print(status == "ativo")
print(status != "inativo")
```

As comparações consideram os caracteres exatamente como foram escritos. `"Ativo"` e `"ativo"` são strings diferentes.

## Tomando uma decisão com `if`

`if` executa um bloco somente quando a condição é verdadeira.

```python
quantidade = 3

if quantidade > 0:
    print("Produto disponível.")
```

Saída:

```text
Produto disponível.
```

A estrutura possui quatro partes importantes:

```text
if condição:
    instrução do bloco
```

1. a palavra `if`;
2. uma condição;
3. dois-pontos `:`;
4. um bloco indentado.

### Indentação define o bloco

Compare:

```python
quantidade = 0

if quantidade > 0:
    print("Produto disponível.")

print("Consulta encerrada.")
```

Saída:

```text
Consulta encerrada.
```

A primeira mensagem pertence ao `if` e não é executada. A segunda está fora do bloco e sempre é executada.

No VS Code, use quatro espaços para cada nível de indentação. A tecla `Tab` normalmente insere esse nível de acordo com a configuração do editor.

> **Atenção:** em Python, indentação não é apenas aparência. Ela determina quais instruções pertencem ao bloco.

## Escolhendo entre dois caminhos com `else`

`else` define o caminho usado quando a condição do `if` é falsa:

```python
quantidade = 0

if quantidade > 0:
    print("Produto disponível.")
else:
    print("Produto esgotado.")
```

Saída:

```text
Produto esgotado.
```

Somente um dos dois blocos será executado.

### Como o Python executa

1. Avalia `quantidade > 0`.
2. Obtém `False`.
3. Ignora o bloco do `if`.
4. Executa o bloco do `else`.
5. Continua depois da estrutura condicional.

> **Teste mental:** se `quantidade` mudar para `1`, qual bloco será executado?

## Criando vários caminhos com `elif`

Quando existem mais de dois resultados possíveis, usamos `elif`:

```python
quantidade = 4
estoque_minimo = 5

if quantidade == 0:
    print("Estoque esgotado.")
elif quantidade <= estoque_minimo:
    print("Estoque crítico.")
else:
    print("Estoque adequado.")
```

Saída:

```text
Estoque crítico.
```

Python verifica as condições de cima para baixo e para na primeira verdadeira. Por isso, a ordem altera o resultado.

### Ordem: específico antes de geral

`quantidade == 0` é um caso específico. `quantidade <= estoque_minimo` é mais geral e também seria verdadeira para zero. O caso de esgotamento precisa aparecer primeiro se desejamos uma mensagem própria.

```text
quantidade igual a 0? → esgotado
senão, quantidade até o mínimo? → crítico
senão → adequado
```

> **Erro comum:** imaginar que Python procura a “melhor” condição. Ele usa a primeira condição verdadeira, mesmo que outra condição abaixo também seja verdadeira.

## Validando limites

Uma quantidade negativa não representa um estoque válido:

```python
quantidade = -2

if quantidade < 0:
    print("Quantidade inválida.")
elif quantidade == 0:
    print("Estoque esgotado.")
else:
    print("Quantidade válida.")
```

Começamos pelo valor inválido. Somente depois classificamos os valores válidos.

O mesmo princípio vale para preços:

```python
preco = 0

if preco <= 0:
    print("Preço inválido.")
else:
    print("Preço válido.")
```

Neste curso, uma regra de validação deve comunicar claramente qual valor é aceito e qual é rejeitado.

## Combinando regras com `and`

`and` resulta em `True` somente quando as duas condições são verdadeiras.

```python
preco = 8.50
quantidade = 4

if preco > 0 and quantidade >= 0:
    print("Valores válidos.")
else:
    print("Existe um valor inválido.")
```

| Primeira condição | Segunda condição | Resultado com `and` |
|---|---|---|
| `True` | `True` | `True` |
| `True` | `False` | `False` |
| `False` | `True` | `False` |
| `False` | `False` | `False` |

Use `and` quando todas as regras combinadas precisam ser satisfeitas.

## Criando alternativas com `or`

`or` resulta em `True` quando pelo menos uma condição é verdadeira.

```python
quantidade = 3
produto_ativo = False

if quantidade == 0 or not produto_ativo:
    print("Produto indisponível.")
else:
    print("Produto disponível.")
```

| Primeira condição | Segunda condição | Resultado com `or` |
|---|---|---|
| `True` | `True` | `True` |
| `True` | `False` | `True` |
| `False` | `True` | `True` |
| `False` | `False` | `False` |

Use `or` quando qualquer uma das situações já é suficiente para escolher o caminho.

## Invertendo uma condição com `not`

`not` inverte um valor booleano:

```python
produto_ativo = False
print(not produto_ativo)
```

Saída:

```text
True
```

Em uma condição:

```python
if not produto_ativo:
    print("Produto inativo.")
```

Leia como: “se o produto não está ativo”.

> **Dica:** prefira condições que possam ser lidas com clareza. Uma expressão com várias inversões pode estar correta e ainda assim ser difícil de compreender.

## Agrupando condições

Parênteses deixam explícita a relação entre regras:

```python
quantidade = 4
estoque_minimo = 5
produto_ativo = True

if produto_ativo and (quantidade == 0 or quantidade <= estoque_minimo):
    print("Produto ativo que exige atenção no estoque.")
```

Primeiro, Python avalia o grupo entre parênteses. Depois, combina seu resultado com `produto_ativo` usando `and`.

Quando uma expressão estiver difícil de explicar em uma frase, considere dividi-la em variáveis booleanas:

```python
estoque_exige_atencao = quantidade == 0 or quantidade <= estoque_minimo

if produto_ativo and estoque_exige_atencao:
    print("Produto ativo que exige atenção no estoque.")
```

Essa segunda versão expõe a intenção da regra.

## Verificando pertencimento com `in`

`in` verifica se um conteúdo aparece dentro de outro. Sem usar coleções ainda, podemos aplicá-lo a strings:

```python
codigo = "CAD-001"

if "-" in codigo:
    print("O código contém um separador.")
else:
    print("O código não contém um separador.")
```

Também podemos inverter o teste:

```python
if " " not in codigo:
    print("O código não contém espaços.")
```

No próximo capítulo, `in` será usado para verificar se um item pertence a uma lista.

## Prática acompanhada — Validador de produto

Abra `starter/validador_base.py`. Vamos validar os dados antes de classificar o estoque.

### Etapa 1 — Receber os dados

```python
nome_produto = input("Produto: ")
preco = float(input("Preço: "))
quantidade = int(input("Quantidade atual: "))
estoque_minimo = int(input("Estoque mínimo: "))
```

Neste capítulo, forneça entradas numéricas no formato solicitado. Tratamento de conversões inválidas será estudado posteriormente.

### Etapa 2 — Rejeitar valores inválidos

Considere inválido quando:

- o preço for menor ou igual a zero;
- a quantidade for negativa;
- o estoque mínimo for negativo.

Use `or`, pois uma única regra violada já invalida o cadastro:

```python
if preco <= 0 or quantidade < 0 or estoque_minimo < 0:
    print("Cadastro inválido.")
```

### Etapa 3 — Classificar valores válidos

Acrescente os caminhos restantes:

```text
valor inválido → Cadastro inválido.
quantidade igual a zero → Situação: estoque esgotado.
quantidade até o mínimo → Situação: estoque crítico.
qualquer outro caso → Situação: estoque adequado.
```

Use uma única estrutura `if` / `elif` / `else`, ordenada de cima para baixo.

### Etapa 4 — Identificar o produto

Inclua o nome do produto nas mensagens válidas usando uma f-string.

### Checklist da prática

- [ ] Preço zero ou negativo é rejeitado.
- [ ] Quantidade negativa é rejeitada.
- [ ] Estoque mínimo negativo é rejeitado.
- [ ] Quantidade zero é classificada como esgotada.
- [ ] Quantidade entre 1 e o mínimo é classificada como crítica.
- [ ] Quantidade acima do mínimo é classificada como adequada.
- [ ] Somente uma classificação é exibida.

> **Pausa sugerida:** este é um bom ponto para o intervalo antes da oficina de depuração.

## Oficina de depuração — A ordem muda o resultado

Abra `starter/classificacao_incorreta.py`:

```python
quantidade = int(input("Quantidade atual: "))
estoque_minimo = 5

if quantidade <= estoque_minimo:
    print("Estoque crítico.")
elif quantidade < 0:
    print("Quantidade inválida.")
elif quantidade == 0:
    print("Estoque esgotado.")
else:
    print("Estoque adequado.")
```

O programa não apresenta traceback. Entretanto:

- para `-2`, exibe `Estoque crítico.`;
- para `0`, também exibe `Estoque crítico.`.

### Investigue antes de corrigir

1. Quais condições são verdadeiras quando a quantidade é `-2`?
2. Qual delas aparece primeiro?
3. Python continua procurando depois que encontra uma condição verdadeira?
4. Quais casos são mais específicos?
5. Em que ordem inválido, esgotado, crítico e adequado devem aparecer?

Teste a correção com pelo menos quatro entradas: `-2`, `0`, `3` e `8`.

| Entrada | Resultado esperado |
|---:|---|
| `-2` | Quantidade inválida. |
| `0` | Estoque esgotado. |
| `3` | Estoque crítico. |
| `8` | Estoque adequado. |

A versão corrigida está em `solucao/` e deverá ser consultada somente depois da investigação e da correção em grupo.

## Exercício independente — Consulta de disponibilidade

### Contexto

Crie um programa que valida os dados de um produto e informa se ele está disponível, esgotado, em nível crítico ou em situação adequada.

### Requisitos

Crie `consulta_disponibilidade.py`. O programa deverá:

1. perguntar o nome do produto;
2. perguntar o preço;
3. perguntar a quantidade atual;
4. perguntar o estoque mínimo;
5. perguntar o status usando exatamente `ativo` ou `inativo`;
6. rejeitar preço menor ou igual a zero;
7. rejeitar quantidade ou estoque mínimo negativos;
8. informar que o produto está inativo quando o status for `inativo`;
9. informar que o produto está esgotado quando a quantidade for zero;
10. informar que a reposição é necessária quando a quantidade for menor ou igual ao estoque mínimo;
11. informar que o estoque está adequado nos demais casos válidos;
12. apresentar apenas uma mensagem de resultado.

### Ordem recomendada das regras

```text
dados numéricos inválidos
        ↓
status diferente de ativo
        ↓
quantidade igual a zero
        ↓
quantidade até o mínimo
        ↓
estoque adequado
```

### Restrições de aprendizagem

- Use somente recursos estudados até este capítulo.
- Use uma estrutura `if` / `elif` / `else`.
- Não use listas, laços ou funções.
- Não use inteligência artificial para produzir ou corrigir o código.

### Exemplos de teste

| Preço | Quantidade | Mínimo | Status | Resultado esperado |
|---:|---:|---:|---|---|
| `-1.00` | `5` | `2` | `ativo` | Dados inválidos. |
| `8.50` | `-1` | `2` | `ativo` | Dados inválidos. |
| `8.50` | `10` | `2` | `inativo` | Produto inativo. |
| `8.50` | `0` | `2` | `ativo` | Produto esgotado. |
| `8.50` | `2` | `2` | `ativo` | Reposição necessária. |
| `8.50` | `8` | `2` | `ativo` | Estoque adequado. |

Use exatamente `ativo` ou `inativo` nos testes. Neste capítulo a comparação distingue maiúsculas e espaços: `"Ativo"` ou `" ativo "` não são iguais a `"ativo"`. Padronizar esse tipo de entrada depende de operações de texto que ainda não vimos, então mantenha os valores exatamente como indicado.

### Pistas graduais

<details>
<summary>Pista 1</summary>

Comece escrevendo apenas a regra de valores numéricos inválidos. Teste antes de acrescentar as outras classificações.

</details>

<details>
<summary>Pista 2</summary>

Uma única condição com `or` pode verificar preço, quantidade e estoque mínimo.

</details>

<details>
<summary>Pista 3</summary>

Depois dos dados inválidos, cada regra restante pode ocupar um `elif`, terminando com `else`.

</details>

A solução comentada está na pasta `solucao/` e deverá ser consultada somente depois da tentativa e da correção em grupo.

## Resumo do capítulo

Neste encontro, você aprendeu que:

- comparações produzem `True` ou `False`;
- `=` atribui e `==` compara;
- `if` executa um bloco quando a condição é verdadeira;
- `else` representa o caminho restante;
- `elif` permite verificar caminhos adicionais;
- indentação define os blocos em Python;
- `and` exige que todas as condições sejam verdadeiras;
- `or` aceita pelo menos uma condição verdadeira;
- `not` inverte um valor booleano;
- `in` verifica pertencimento;
- Python usa a primeira condição verdadeira;
- regras inválidas e casos específicos devem aparecer antes de regras gerais.

## Verifique seu aprendizado

Responda antes de executar código.

1. Qual é a diferença entre `=` e `==`?
2. O que acontece com o bloco de um `if` quando a condição é falsa e não existe `else`?
3. Por que a indentação é importante?
4. Quando devemos usar `and` em uma validação?
5. Quando devemos usar `or`?
6. Qual é o resultado de `not True`?
7. O que `"-" in "CAD-001"` produz?
8. Por que `quantidade <= minimo` não deve aparecer antes de `quantidade == 0` quando queremos distinguir estoque crítico de esgotado?
9. Um programa sem traceback está necessariamente correto? Explique.

## Tarefa de saída

Crie `verificar_preco.py`. O programa deverá:

1. perguntar o nome do produto;
2. perguntar o preço e convertê-lo para `float`;
3. exibir `[produto]: preço válido.` quando o preço for maior que zero;
4. exibir `[produto]: preço inválido.` nos demais casos;
5. ser executado pelo terminal.

### Critérios de conclusão

- [ ] O programa usa `if` e `else`.
- [ ] O preço é convertido antes da comparação.
- [ ] Apenas uma mensagem de resultado aparece.
- [ ] Testei com um valor positivo, zero e um valor negativo.
- [ ] Consigo explicar minha solução com minhas próprias palavras.

## Vocabulário

| Termo | Significado neste capítulo |
|---|---|
| Condição | Expressão avaliada como `True` ou `False`. |
| Comparação | Operação que relaciona dois valores e produz um booleano. |
| Bloco | Grupo de instruções definido pela indentação. |
| Indentação | Espaços no início da linha que determinam a estrutura do código. |
| Caminho ou ramo (*branch*) | Parte do programa escolhida por uma condição. |
| Validação | Verificação de que um valor respeita uma regra. |
| `and` | Operador lógico que exige todas as condições verdadeiras. |
| `or` | Operador lógico que exige pelo menos uma condição verdadeira. |
| `not` | Operador lógico que inverte um booleano. |
| `in` | Operador que verifica pertencimento. |

## Referências e continuidade

- [Estruturas de controle — documentação oficial do Python](https://docs.python.org/3/tutorial/controlflow.html#if-statements)
- [Comparações e operações booleanas](https://docs.python.org/3/library/stdtypes.html#truth-value-testing)
- [Operadores de comparação e pertencimento](https://docs.python.org/3/reference/expressions.html#comparisons)

No próximo capítulo, reuniremos vários produtos em listas e usaremos índices e métodos para consultar e alterar essas coleções.
