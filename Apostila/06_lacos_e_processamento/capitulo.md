# Capítulo 6 — Laços e processamento repetido

Uma lista resolve o problema de guardar vários valores, mas ainda precisamos processá-los. Escrever uma instrução para cada posição funciona apenas enquanto a coleção é pequena e conhecida.

Neste encontro, usaremos laços para percorrer coleções, repetir cálculos e controlar operações que continuam até uma condição mudar.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 6 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | `for`, `while`, contadores e acumuladores |
| Produto do encontro | Um relatório que processa todos os itens do estoque |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Baixe e extraia o pacote inicial desta seção. Se estiver usando a pasta completa da apostila, copie `starter/`. Abra a cópia no VS Code.

```text
starter/
├── acumulador_incorreto.py
└── relatorio_base.py
```

Você precisa reconhecer listas, índices, `len()`, condicionais e operações numéricas.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- percorrer uma lista com `for`;
- gerar sequências com `range()`;
- usar contador e acumulador;
- combinar laços e condicionais;
- percorrer listas relacionadas por índice;
- construir um `while` com condição de parada;
- reconhecer um laço infinito;
- escolher entre `for` e `while`;
- depurar um acumulador reiniciado no lugar errado.

## Situação-problema

Um relatório de estoque precisa aplicar a mesma regra a cada produto: exibir a quantidade, classificar a situação e atualizar os totais. Repetir essas instruções manualmente torna o programa longo e difícil de atualizar.

Os laços permitem descrever a regra uma vez e aplicá-la a todos os itens.

## Repetindo com `for`

```python
produtos = ["Caderno", "Caneta", "Borracha"]

for produto in produtos:
    print(produto)
```

Saída:

```text
Caderno
Caneta
Borracha
```

Em cada repetição, `produto` recebe o próximo item. O nome dessa variável é escolhido pelo programador e deve representar um item da coleção.

```text
for item in colecao:
    instruções repetidas
```

A indentação define o bloco repetido.

> **Erro comum:** escrever o `print()` fora do bloco. Nesse caso, ele executa uma vez depois que o laço termina.

## Criando sequências com `range()`

`range()` produz uma sequência de inteiros para controlar repetições:

```python
for numero in range(5):
    print(numero)
```

Saída:

```text
0
1
2
3
4
```

O limite final não é incluído.

```python
for numero in range(1, 6):
    print(numero)
```

Produz `1` até `5`.

Também podemos definir o passo:

```python
for numero in range(0, 11, 2):
    print(numero)
```

Produz `0`, `2`, `4`, `6`, `8` e `10`.

## Contadores e acumuladores

Um contador registra quantas vezes algo aconteceu:

```python
quantidades = [4, 0, 2, 8]
esgotados = 0

for quantidade in quantidades:
    if quantidade == 0:
        esgotados += 1

print(f"Produtos esgotados: {esgotados}")
```

Um acumulador reúne valores:

```python
quantidades = [4, 0, 2, 8]
total_unidades = 0

for quantidade in quantidades:
    total_unidades += quantidade

print(f"Total de unidades: {total_unidades}")
```

`total_unidades += quantidade` equivale a:

```python
total_unidades = total_unidades + quantidade
```

O valor inicial precisa existir antes do laço. Se ele for criado dentro do bloco, será reiniciado em cada repetição.

## Laço com decisão

```python
quantidades = [4, 0, 2, 8]
estoque_minimo = 3

for quantidade in quantidades:
    if quantidade == 0:
        print("Esgotado")
    elif quantidade <= estoque_minimo:
        print("Crítico")
    else:
        print("Adequado")
```

Cada item percorre a mesma sequência de regras.

## Percorrendo listas relacionadas

Antes de estudarmos registros estruturados, podemos encontrar duas listas com posições correspondentes:

```python
produtos = ["Caderno", "Caneta", "Borracha"]
quantidades = [8, 2, 0]

for indice in range(len(produtos)):
    print(f"{produtos[indice]}: {quantidades[indice]}")
```

Saída:

```text
Caderno: 8
Caneta: 2
Borracha: 0
```

Esse modelo exige que as listas tenham o mesmo tamanho e a mesma ordem. Mais adiante, dicionários e objetos permitirão agrupar os dados de maneira mais segura.

> **Teste mental:** o que acontece se `quantidades` possuir menos itens que `produtos`?

## Repetindo enquanto uma condição for verdadeira

`while` repete enquanto sua condição produzir `True`:

```python
resposta = ""

while resposta != "sair":
    resposta = input("Digite sair para encerrar: ")

print("Programa encerrado.")
```

### Condição de parada

Alguma instrução dentro do laço precisa aproximar o programa do encerramento. No exemplo, a entrada pode mudar `resposta`.

Outro uso é insistir até receber um valor válido:

```python
quantidade = int(input("Quantidade não negativa: "))

while quantidade < 0:
    print("Valor inválido.")
    quantidade = int(input("Quantidade não negativa: "))

print("Quantidade aceita.")
```

Neste exemplo, pressupomos que a pessoa digitará um número inteiro. Se ela escrever algo como `dez`, a conversão com `int()` interromperá o programa. A recuperação desse tipo de entrada será estudada no Capítulo 11, com exceções.

### Laço infinito

```python
contador = 0

while contador < 3:
    print(contador)
```

`contador` nunca muda, então a condição permanece verdadeira. Para interromper um programa preso no terminal, use `Ctrl+C`.

Correção:

```python
contador = 0

while contador < 3:
    print(contador)
    contador += 1
```

## `for` ou `while`?

Use `for` quando você percorre uma coleção ou conhece a sequência de repetições. Use `while` quando a repetição depende de uma condição cujo momento de mudança não é conhecido antecipadamente.

| Situação | Escolha natural |
|---|---|
| Percorrer todos os produtos | `for` |
| Repetir dez vezes | `for` com `range()` |
| Solicitar entrada até ela ser válida | `while` |
| Continuar até o usuário pedir para sair | `while` |

## Prática acompanhada — Resumo do estoque

Abra `starter/relatorio_base.py`. O arquivo fornece produtos e quantidades.

Antes do laço, crie os acumuladores com valor inicial `0`.

Durante o laço:

1. exiba o nome e a quantidade de cada produto;
2. some todas as unidades;
3. conte quantos produtos estão esgotados;
4. conte quantos possuem quantidade entre `1` e o estoque mínimo;
5. ao final, apresente os três totais.

Use `range(len(produtos))` para acessar as posições correspondentes.

Saída final esperada para os dados fornecidos:

```text
Total de unidades: 18
Produtos esgotados: 1
Produtos críticos: 1
```

### Checklist da prática

- [ ] Os três acumuladores começam antes do laço.
- [ ] O laço percorre todos os índices das listas.
- [ ] Cada produto aparece com sua quantidade.
- [ ] As condições distinguem itens esgotados e críticos.
- [ ] O resumo aparece somente depois do laço.

> **Pausa sugerida:** este é um bom ponto para o intervalo.

## Oficina de depuração — Total que esquece o passado

Abra `starter/acumulador_incorreto.py`:

```python
quantidades = [5, 3, 7]

for quantidade in quantidades:
    total = 0
    total += quantidade

print(f"Total: {total}")
```

O resultado é `7`, não `15`.

Investigue:

1. Quantas vezes `total = 0` executa?
2. Qual valor existe ao iniciar cada repetição?
3. Onde o acumulador deve ser inicializado?
4. Use uma tabela para registrar `quantidade` e `total` em cada passo.

A correção está em `solucao/`.

## Exercício independente — Relatório de reposição

Crie `relatorio_reposicao.py` com:

```python
produtos = ["Caderno", "Caneta", "Borracha", "Lápis", "Régua"]
quantidades = [10, 0, 3, 7, 1]
estoque_minimo = 3
```

### Requisitos

O programa deverá:

1. exibir cada produto e sua quantidade;
2. classificar cada item como esgotado, crítico ou adequado;
3. somar todas as unidades;
4. contar itens esgotados, críticos e adequados;
5. exibir o resumo somente depois do laço.

Use apenas recursos estudados até aqui. Não use dicionários, funções ou inteligência artificial.

### Resultado esperado

```text
Caderno: 10 — adequado
Caneta: 0 — esgotado
Borracha: 3 — crítico
Lápis: 7 — adequado
Régua: 1 — crítico
Total de unidades: 21
Esgotados: 1
Críticos: 2
Adequados: 2
```

<details>
<summary>Pista</summary>

Crie os quatro acumuladores antes do `for`. Dentro dele, use uma estrutura `if` / `elif` / `else`.

</details>

## Resumo do capítulo

- `for` percorre coleções e sequências.
- `range()` cria sequências de inteiros e não inclui o limite final.
- Contadores registram ocorrências.
- Acumuladores reúnem valores.
- Ambos devem ser inicializados antes do laço.
- Laços podem conter condicionais.
- `while` repete enquanto uma condição for verdadeira.
- A condição de um `while` precisa poder mudar.
- `for` é natural para coleções; `while`, para repetição condicionada.

## Verifique seu aprendizado

1. Quais valores são produzidos por `range(1, 5)`?
2. Por que um acumulador começa antes do laço?
3. Qual diferença existe entre contador e acumulador?
4. Quando duas listas relacionadas podem causar `IndexError`?
5. O que torna um `while` infinito?
6. Qual laço você escolheria para processar uma lista inteira?

## Tarefa de saída

Crie `somar_quantidades.py` com a lista `[2, 5, 1, 8]`. Use um laço para somar os valores e exibir `Total: 16`. Não use `sum()` neste exercício.

### Critérios de conclusão

- [ ] O acumulador começa em `0` antes do laço.
- [ ] Cada quantidade é adicionada uma vez.
- [ ] A saída final é `Total: 16`.
- [ ] Consigo explicar por que o acumulador não deve começar dentro do laço.

## Vocabulário

| Termo | Significado |
|---|---|
| Laço (*loop*) | Estrutura que repete instruções. |
| Iteração | Uma execução do bloco repetido. |
| Contador | Variável que registra ocorrências. |
| Acumulador | Variável que reúne valores ao longo das iterações. |
| Condição de parada | Regra que permite encerrar um `while`. |
| Laço infinito | Repetição cuja condição nunca deixa de ser verdadeira. |

## Referências e continuidade

- [Instrução `for` e função `range()`](https://docs.python.org/3/tutorial/controlflow.html#for-statements)
- [Instrução `while`](https://docs.python.org/3/reference/compound_stmts.html#the-while-statement)

No próximo capítulo, transformaremos operações repetidas em funções nomeadas e reutilizáveis.
